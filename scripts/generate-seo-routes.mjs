import fs from "node:fs/promises";
import path from "node:path";

const OUTPUT_PATH = path.join(process.cwd(), "lib", "generated", "seo-routes.json");

const OPENFLIGHTS_AIRPORTS_URL =
  "https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat";
const OPENFLIGHTS_ROUTES_URL =
  "https://raw.githubusercontent.com/jpatokal/openflights/master/data/routes.dat";

function slugifyCity(name) {
  return String(name || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function titleCase(s) {
  return String(s || "")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function parseDatLines(text) {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));
}

function parseAirports(airportsDat) {
  // airports.dat CSV-ish with quoted strings. We’ll parse by splitting on "," but respecting quotes.
  const airports = new Map(); // iata -> { city, name, country }

  for (const line of parseDatLines(airportsDat)) {
    // Format: Airport ID,Name,City,Country,IATA,ICAO,Lat,Long,...
    // Example: 507,"Heathrow","London","United Kingdom","LHR","EGLL",...
    const parts = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') inQuotes = !inQuotes;
      if (ch === "," && !inQuotes) {
        parts.push(cur);
        cur = "";
      } else {
        cur += ch;
      }
    }
    parts.push(cur);

    const name = parts[1]?.replaceAll('"', "")?.trim();
    const city = parts[2]?.replaceAll('"', "")?.trim();
    const country = parts[3]?.replaceAll('"', "")?.trim();
    const iata = parts[4]?.replaceAll('"', "")?.trim();

    if (!iata || iata === "\\N" || iata.length !== 3) continue;
    if (!city) continue;

    // Prefer the first airport we see for an IATA code.
    if (!airports.has(iata)) {
      airports.set(iata, { iata, city: titleCase(city), country: titleCase(country || ""), name: titleCase(name || "") });
    }
  }
  return airports;
}

function parseRoutes(routesDat, airports) {
  // routes.dat: Airline, Airline ID, Source airport, Source airport ID, Destination airport, Destination airport ID, Codeshare, Stops, Equipment
  // Example: AA,24,JFK,3797,LAX,3484,,0,738
  const pairs = new Map(); // key "JFK|MAD" -> count
  for (const line of parseDatLines(routesDat)) {
    const parts = line.split(",");
    const src = parts[2]?.trim();
    const dst = parts[4]?.trim();
    if (!src || !dst) continue;
    if (src.length !== 3 || dst.length !== 3) continue;
    if (!airports.has(src) || !airports.has(dst)) continue;
    const key = `${src}|${dst}`;
    pairs.set(key, (pairs.get(key) || 0) + 1);
  }
  return pairs;
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return await res.text();
}

async function main() {
  const maxRoutes = Number(process.env.SEO_MAX_ROUTES || "8000");

  let airportsDat;
  let routesDat;
  try {
    console.log(`[seo] fetching OpenFlights airports + routes`);
    [airportsDat, routesDat] = await Promise.all([
      fetchText(OPENFLIGHTS_AIRPORTS_URL),
      fetchText(OPENFLIGHTS_ROUTES_URL),
    ]);
  } catch (err) {
    // Build-safe fallback: don't fail CI/Vercel builds if network is blocked.
    // If a previous generated file exists, keep using it. Otherwise generate an empty dataset.
    try {
      await fs.access(OUTPUT_PATH);
      console.warn(`[seo] fetch failed; reusing existing ${OUTPUT_PATH}`);
      return;
    } catch {
      console.warn(`[seo] fetch failed and no cache found; writing empty routes file`);
      await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
      await fs.writeFile(
        OUTPUT_PATH,
        JSON.stringify({ generatedAt: new Date().toISOString(), routes: [] }, null, 2)
      );
      return;
    }
  }

  const airports = parseAirports(airportsDat);
  const routeCounts = parseRoutes(routesDat, airports);

  // Take the most common route pairs (proxy for popularity).
  const topPairs = Array.from(routeCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxRoutes)
    .map(([key]) => key);

  const records = topPairs.map((key) => {
    const [fromIata, toIata] = key.split("|");
    const from = airports.get(fromIata);
    const to = airports.get(toIata);

    // Slugs based on CITY (not IATA) to match your SEO URL preference.
    // Note: multiple airports can map to same city; this is fine for SEO.
    return {
      from: { slug: slugifyCity(from.city), name: from.city, iata: fromIata },
      to: { slug: slugifyCity(to.city), name: to.city, iata: toIata },
    };
  });

  // De-dupe by slug pair (city-to-city).
  const seen = new Set();
  const unique = [];
  for (const r of records) {
    const key = `${r.from.slug}|${r.to.slug}`;
    if (r.from.slug === r.to.slug) continue;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(r);
  }

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, JSON.stringify({ generatedAt: new Date().toISOString(), routes: unique }, null, 2));

  console.log(`[seo] wrote ${unique.length} routes to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

