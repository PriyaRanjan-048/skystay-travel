"use client";

import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/contact";
import { FaPhone } from "react-icons/fa";

type StickyCallBarProps = {
  label?: string;
};

export default function StickyCallBar({ label = "Call now to book" }: StickyCallBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="mx-auto max-w-5xl px-4 pb-[max(env(safe-area-inset-bottom),0px)]">
        <div className="mb-3 rounded-2xl bg-white/95 shadow-2xl ring-1 ring-black/5 backdrop-blur">
          <div className="flex items-center justify-between gap-3 p-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-800">{label}</p>
              <p className="text-sm font-bold text-primary-700">{CONTACT_PHONE_DISPLAY}</p>
            </div>
            <a
              href={`tel:${CONTACT_PHONE_TEL}`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white shadow-md active:scale-[0.99]"
            >
              <FaPhone className="text-sm" />
              Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

