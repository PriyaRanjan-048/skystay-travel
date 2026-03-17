import Link from "next/link";
import { notFound } from "next/navigation";
import TrustStrip from "@/components/seo/TrustStrip";
import StickyCallBar from "@/components/seo/StickyCallBar";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/contact";
import { findSeoRoute, getRelatedFrom, getRelatedTo } from "@/lib/seo-routes";
import { FaArrowRight, FaPhone } from "react-icons/fa";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{
    route: string; // e.g. "new-york-to-madrid"
  }>;
};

function titleCaseFromSlug(slug: string) {
  return String(slug || "")
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function parseRouteParam(routeParam: string): { from: string; to: string } | null {
  const raw = String(routeParam || "").trim();
  const parts = raw.split("-to-");
  if (parts.length !== 2) return null;
  const from = parts[0]?.trim();
  const to = parts[1]?.trim();
  if (!from || !to) return null;
  return { from, to };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { route } = await params;
  const parsed = parseRouteParam(route);
  if (!parsed) return {};

  const seoRoute = findSeoRoute(parsed.from, parsed.to);
  const fromName = seoRoute?.from.name || titleCaseFromSlug(parsed.from);
  const toName = seoRoute?.to.name || titleCaseFromSlug(parsed.to);

  return {
    title: `Cheap Flights from ${fromName} to ${toName} | Call for Best Deals`,
    description: `Looking for cheap flights from ${fromName} to ${toName}? Call our travel experts for exclusive deals, last‑minute availability, and 24/7 booking support.`,
  };
}

export default async function RoutePage({ params }: PageProps) {
  const { route } = await params;
  const parsed = parseRouteParam(route);
  if (!parsed) notFound();

  const seoRoute = findSeoRoute(parsed.from, parsed.to);
  const fromName = seoRoute?.from.name || titleCaseFromSlug(parsed.from);
  const toName = seoRoute?.to.name || titleCaseFromSlug(parsed.to);
  const airportsLine =
    seoRoute?.from.iata && seoRoute?.to.iata ? `${seoRoute.from.iata} → ${seoRoute.to.iata}` : "Major airports";

  const relatedFrom = getRelatedFrom(parsed.from, parsed.to).map((r) => ({
    href: `/flights/${r.from.slug}-to-${r.to.slug}`,
    label: `${r.from.name} → ${r.to.name}`,
  }));
  const relatedTo = getRelatedTo(parsed.to, parsed.from).map((r) => ({
    href: `/flights/${r.from.slug}-to-${r.to.slug}`,
    label: `${r.from.name} → ${r.to.name}`,
  }));

  return (
    <div className="pt-36 pb-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl bg-gradient-to-r from-primary-700 via-primary-700 to-secondary-700 p-6 text-white shadow-xl sm:p-10">
            <p className="text-xs font-semibold tracking-wide text-primary-100">
              Flights • {fromName} → {toName} • Fast booking by phone
            </p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              Call Now for Cheapest Flights: {fromName} to {toName}
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-semibold text-white/95">
              Get instant booking assistance, exclusive phone-only deals, and zero hidden charges.
            </p>
            <p className="mt-3 max-w-2xl text-white/90">
              Speak to a travel expert in minutes. Get phone-only deals, last‑minute availability, and help with
              baggage, changes, and family bookings.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-base font-extrabold text-primary-700 shadow-lg hover:bg-primary-50"
              >
                <FaPhone />
                Call Now: {CONTACT_PHONE_DISPLAY}
              </a>
              <div className="text-sm font-semibold text-white/90">Available 24/7 • English & Español</div>
            </div>

            <div className="mt-6">
              <TrustStrip
                items={[
                  "Instant booking assistance (real humans)",
                  "Secure support • No hidden charges",
                  "24/7 help • English & Español",
                ]}
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Route overview</h2>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-gray-200">
                  <p className="text-xs font-semibold text-gray-500">Typical duration</p>
                  <p className="mt-1 text-lg font-bold text-gray-900">Varies</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-gray-200">
                  <p className="text-xs font-semibold text-gray-500">Common airports</p>
                  <p className="mt-1 text-lg font-bold text-gray-900">{airportsLine}</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-gray-200">
                  <p className="text-xs font-semibold text-gray-500">Best for</p>
                  <p className="mt-1 text-lg font-bold text-gray-900">Great deals</p>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-white p-4 ring-1 ring-gray-200">
                <p className="text-sm font-bold text-gray-900">Cheapest months (often)</p>
                <p className="mt-1 text-sm text-gray-700">Varies by season and availability.</p>
              </div>

              <div className="mt-4 rounded-xl bg-white p-4 ring-1 ring-gray-200">
                <p className="text-sm font-bold text-gray-900">Airlines on this route</p>
                <p className="mt-1 text-sm text-gray-700">
                  Call to compare today’s best options and find the fastest/cheapest itinerary.
                </p>
              </div>

              <div className="mt-4 rounded-xl bg-white p-4 ring-1 ring-gray-200">
                <p className="text-sm font-bold text-gray-900">Why book via call?</p>
                <ul className="mt-2 space-y-2 text-sm text-gray-700">
                  <li>• Faster than searching multiple sites</li>
                  <li>• Help with baggage, layovers, and special requests</li>
                  <li>• Support for changes/cancellations and rebooking</li>
                  <li>• Clear pricing before you confirm</li>
                </ul>
              </div>

              <div className="mt-5 rounded-xl bg-primary-50 p-4 ring-1 ring-primary-100">
                <p className="font-bold text-primary-800">Limited seats & prices change fast.</p>
                <p className="text-sm text-primary-800/80">
                  Call now to check live availability and lock the best deal before it’s gone.
                </p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <a
                    href={`tel:${CONTACT_PHONE_TEL}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white hover:bg-green-700"
                  >
                    <FaPhone className="text-sm" />
                    Speak to an agent
                  </a>
                  <Link
                    href="/flights"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-primary-700 ring-1 ring-primary-200 hover:bg-primary-50"
                  >
                    Search flights <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-gradient-to-r from-secondary-600 to-primary-600 p-5 text-white shadow-md">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-bold">Ready to book {fromName} → {toName}?</p>
                    <p className="text-sm text-white/90">Call now and we’ll handle the booking in minutes.</p>
                  </div>
                  <a
                    href={`tel:${CONTACT_PHONE_TEL}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-primary-700 hover:bg-primary-50"
                  >
                    <FaPhone className="text-sm" />
                    Call Now
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <h3 className="text-lg font-bold text-gray-900">What you get</h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-700">
                <li>• Fare comparison across airlines</li>
                <li>• Help with baggage and layovers</li>
                <li>• Family / group booking support</li>
                <li>• Quick changes and rebooking help</li>
              </ul>

              <div className="mt-6 rounded-xl bg-gray-50 p-4 ring-1 ring-gray-200">
                <p className="text-xs font-semibold text-gray-600">Call now</p>
                <a href={`tel:${CONTACT_PHONE_TEL}`} className="mt-1 block text-lg font-extrabold text-primary-700">
                  {CONTACT_PHONE_DISPLAY}
                </a>
                <p className="mt-1 text-xs text-gray-500">Tap to call on mobile.</p>
              </div>

              {(relatedFrom.length > 0 || relatedTo.length > 0) && (
                <div className="mt-6 space-y-5">
                  {relatedFrom.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-gray-600">More routes from {fromName}</p>
                      <ul className="mt-2 space-y-2">
                        {relatedFrom.map((r) => (
                          <li key={r.href}>
                            <Link className="text-sm font-semibold text-primary-700 hover:underline" href={r.href}>
                              {r.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {relatedTo.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-gray-600">More flights to {toName}</p>
                      <ul className="mt-2 space-y-2">
                        {relatedTo.map((r) => (
                          <li key={r.href}>
                            <Link className="text-sm font-semibold text-primary-700 hover:underline" href={r.href}>
                              {r.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <StickyCallBar label={`${fromName} → ${toName} deals available`} />
        </div>
      </div>
    </div>
  );
}

