import Link from "next/link";
import TrustStrip from "@/components/seo/TrustStrip";
import StickyCallBar from "@/components/seo/StickyCallBar";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/contact";
import { FaPhone, FaArrowRight } from "react-icons/fa";

export const metadata = {
  title: "Cheap Flights from New York to Madrid | Call for Best Deals",
  description:
    "Looking for cheap flights from New York to Madrid? Call our travel experts for exclusive deals, last‑minute availability, and 24/7 booking support.",
};

export default function NewYorkToMadridPage() {
  return (
    <div className="pt-36 pb-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Above the fold */}
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl bg-gradient-to-r from-primary-700 via-primary-700 to-secondary-700 p-6 text-white shadow-xl sm:p-10">
            <p className="text-xs font-semibold tracking-wide text-primary-100">
              Flights • NYC → Madrid • Fast booking by phone
            </p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              Cheap Flights from New York to Madrid
            </h1>
            <p className="mt-3 max-w-2xl text-white/90">
              Call our agents to compare airlines, find the best fares, and secure seats quickly—perfect for
              urgent or last‑minute trips.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-base font-extrabold text-primary-700 shadow-lg hover:bg-primary-50"
              >
                <FaPhone />
                Call Now: {CONTACT_PHONE_DISPLAY}
              </a>
              <div className="text-sm font-semibold text-white/90">
                Available 24/7 • English & Español
              </div>
            </div>

            <div className="mt-6">
              <TrustStrip
                items={[
                  "10,000+ customers helped",
                  "24/7 booking support",
                  "No hidden charges",
                ]}
              />
            </div>
          </div>

          {/* Urgency + key info */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Route overview</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-gray-200">
                  <p className="text-xs font-semibold text-gray-500">Typical duration</p>
                  <p className="mt-1 text-lg font-bold text-gray-900">7–9 hours</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-gray-200">
                  <p className="text-xs font-semibold text-gray-500">Common airports</p>
                  <p className="mt-1 text-lg font-bold text-gray-900">JFK/EWR → MAD</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-gray-200">
                  <p className="text-xs font-semibold text-gray-500">Best for</p>
                  <p className="mt-1 text-lg font-bold text-gray-900">Last‑minute deals</p>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-primary-50 p-4 ring-1 ring-primary-100">
                <p className="font-bold text-primary-800">Prices can change fast.</p>
                <p className="text-sm text-primary-800/80">
                  Call now to lock a deal and check live availability before seats sell out.
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
                    Search other routes <FaArrowRight className="text-xs" />
                  </Link>
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
                <a
                  href={`tel:${CONTACT_PHONE_TEL}`}
                  className="mt-1 block text-lg font-extrabold text-primary-700"
                >
                  {CONTACT_PHONE_DISPLAY}
                </a>
                <p className="mt-1 text-xs text-gray-500">Tap to call on mobile.</p>
              </div>
            </div>
          </div>

          {/* Mobile sticky CTA */}
          <StickyCallBar label="New York → Madrid deals available" />
        </div>
      </div>
    </div>
  );
}

