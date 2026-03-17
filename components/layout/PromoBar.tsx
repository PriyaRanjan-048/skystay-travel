"use client";

import { useLayoutEffect, useRef } from "react";
import { FaPhone, FaHeadset } from 'react-icons/fa';

export const PromoBar = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const setVar = () => {
      const h = Math.ceil(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--promo-bar-height", `${h}px`);
    };

    setVar();
    const ro = new ResizeObserver(() => setVar());
    ro.observe(el);
    window.addEventListener("resize", setVar);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setVar);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-full bg-gradient-to-r from-primary-800 via-primary-700 to-secondary-700 text-white py-2.5 z-50"
    >
      <div className="container mx-auto px-4 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <FaHeadset className="text-primary-200 text-lg animate-pulse-slow hidden sm:block" />
          <p className="text-sm md:text-base font-medium">
            📞 Call Now for <strong className="text-primary-200">Exclusive Flight Deals!</strong>
          </p>
          <a
            href="tel:+18001234567"
            className="bg-white text-primary-700 hover:bg-primary-50 transition-colors px-4 py-1 rounded-full text-sm font-bold flex items-center shadow-md hover:shadow-lg"
          >
            <FaPhone className="mr-1.5 text-xs" />
            1-800-123-4567
          </a>
          <span className="hidden md:inline text-primary-200 text-sm">
            — Available 24/7 • English & Español
          </span>
        </div>
      </div>
    </div>
  );
};
