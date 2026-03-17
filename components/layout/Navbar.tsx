"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPhone, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isLinkActive = (path: string) => pathname === path;
  const isHome = pathname === "/";
  const useSolidNav = isScrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Flights", path: "/flights" },
    { name: "Hotels", path: "/hotels" },
    { name: "Packages", path: "/packages" },
    { name: "Deals", path: "/deals" },
    { name: "Support", path: "/support" },
  ];

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-40 transition-all duration-300 ${
        useSolidNav ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
      style={{ top: "var(--promo-bar-height, 40px)" }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl md:text-3xl font-bold flex items-center">
            <span className={useSolidNav ? "text-primary-600" : "text-white text-shadow-sm"}>
              Sky
            </span>
            <span className={useSolidNav ? "text-secondary-600" : "text-primary-300 text-shadow-sm"}>
              Stay
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`font-medium text-sm ${
                  isLinkActive(link.path)
                    ? useSolidNav
                      ? "text-primary-600"
                      : "text-white font-semibold text-shadow-sm"
                    : useSolidNav
                    ? "text-gray-600 hover:text-primary-600"
                    : "text-white text-shadow-sm hover:text-primary-200"
                } transition-colors relative`}
              >
                {link.name}
                {isLinkActive(link.path) && (
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-500"
                    layoutId="navbar-indicator"
                  ></motion.span>
                )}
              </Link>
            ))}

            {/* Call CTA Button */}
            <a
              href="tel:+18001234567"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <FaPhone className="mr-2 text-xs animate-pulse" />
              Call: 1-800-123-4567
            </a>
          </div>

          {/* Mobile: Phone + Menu */}
          <div className="lg:hidden flex items-center space-x-3">
            <a
              href="tel:+18001234567"
              className="bg-green-500 text-white p-2.5 rounded-full shadow-lg"
              aria-label="Call us"
            >
              <FaPhone className="text-sm" />
            </a>
            <button
              className="text-2xl focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <FaTimes className={useSolidNav ? "text-gray-800" : "text-white"} />
              ) : (
                <FaBars className={useSolidNav ? "text-gray-800" : "text-white"} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-white mt-4 rounded-xl shadow-lg"
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`block py-3 px-3 rounded-lg ${
                      isLinkActive(link.path)
                        ? "text-primary-600 font-medium bg-primary-50"
                        : "text-gray-800 hover:bg-gray-50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-2 mt-2 border-t border-gray-200">
                  <a
                    href="tel:+18001234567"
                    className="flex items-center justify-center py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold"
                  >
                    <FaPhone className="mr-2" />
                    Call Now: 1-800-123-4567
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
