import fs from "node:fs";
import path from "node:path";

export type SeoRoute = {
  from: { slug: string; name: string; iata?: string };
  to: { slug: string; name: string; iata?: string };
};

const GENERATED_PATH = path.join(process.cwd(), "lib", "generated", "seo-routes.json");

export function readSeoRoutes(): SeoRoute[] {
  try {
    const raw = fs.readFileSync(GENERATED_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed?.routes) ? parsed.routes : [];
  } catch {
    return [];
  }
}

let cache:
  | {
      routes: SeoRoute[];
      byPair: Map<string, SeoRoute>;
      byFrom: Map<string, SeoRoute[]>;
      byTo: Map<string, SeoRoute[]>;
    }
  | undefined;

function getCache() {
  if (cache) return cache;
  const routes = readSeoRoutes();
  const byPair = new Map<string, SeoRoute>();
  const byFrom = new Map<string, SeoRoute[]>();
  const byTo = new Map<string, SeoRoute[]>();

  for (const r of routes) {
    byPair.set(`${r.from.slug}|${r.to.slug}`, r);
    byFrom.set(r.from.slug, [...(byFrom.get(r.from.slug) || []), r]);
    byTo.set(r.to.slug, [...(byTo.get(r.to.slug) || []), r]);
  }

  cache = { routes, byPair, byFrom, byTo };
  return cache;
}

export function findSeoRoute(fromSlug: string, toSlug: string): SeoRoute | undefined {
  return getCache().byPair.get(`${fromSlug}|${toSlug}`);
}

export function getRelatedFrom(fromSlug: string, excludeToSlug: string, limit = 5): SeoRoute[] {
  return (getCache().byFrom.get(fromSlug) || []).filter((r) => r.to.slug !== excludeToSlug).slice(0, limit);
}

export function getRelatedTo(toSlug: string, excludeFromSlug: string, limit = 5): SeoRoute[] {
  return (getCache().byTo.get(toSlug) || []).filter((r) => r.from.slug !== excludeFromSlug).slice(0, limit);
}

