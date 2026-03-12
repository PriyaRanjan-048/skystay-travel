"use client";

import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaCreditCard,
  FaPaypal,
  FaApplePay,
  FaGooglePay,
  FaPhone,
  FaShieldAlt,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Call Banner Strip */}
      <div className="bg-primary-700 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-white font-bold text-lg">Ready to Book Your Next Trip?</p>
            <p className="text-primary-200 text-sm">Our travel experts are standing by 24/7</p>
          </div>
          <a
            href="tel:+18001234567"
            className="inline-flex items-center bg-white text-primary-700 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-primary-50 transition-all hover:scale-105"
          >
            <FaPhone className="mr-2" />
            Call Now: 1-800-123-4567
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold">
                <span className="text-primary-400">Sky</span>
                <span className="text-secondary-400">Stay</span>
              </span>
            </Link>
            <p className="mb-4 text-sm text-gray-400 leading-relaxed">
              SkyStay Travel helps you find the best travel deals on flights, hotels, 
              and vacation packages. Call our expert agents for personalized service 
              and exclusive phone-only deals.
            </p>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaYoutube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Find Flights", href: "/flights" },
                { label: "Book Hotels", href: "/hotels" },
                { label: "Flight + Hotel Packages", href: "/packages" },
                { label: "Travel Deals", href: "/deals" },
                { label: "Support", href: "/support" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Help Center", href: "/support" },
                { label: "Contact Us", href: "/support" },
                { label: "FAQs", href: "/support" },
                { label: "Terms & Conditions", href: "/support" },
                { label: "Privacy Policy", href: "/support" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-gray-400">
                <span className="block text-white font-medium">Phone (24/7):</span>
                <a href="tel:+18001234567" className="text-primary-400 hover:underline text-lg font-bold">
                  +1 (800) 123-4567
                </a>
              </li>
              <li className="text-gray-400">
                <span className="block">Email:</span>
                <a href="mailto:support@skystay.com" className="text-primary-400 hover:underline">
                  support@skystay.com
                </a>
              </li>
              <li className="text-gray-400">
                <span className="block">Languages:</span>
                <span>English & Español</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-white text-sm font-medium mb-2">Accepted Payment Methods</h4>
              <div className="flex space-x-3">
                <FaCreditCard className="text-gray-400" size={24} />
                <FaPaypal className="text-gray-400" size={24} />
                <FaApplePay className="text-gray-400" size={24} />
                <FaGooglePay className="text-gray-400" size={24} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Legal Disclaimer */}
        <div className="border-t border-gray-800 mt-12 pt-6">
          <div className="flex items-start gap-3 mb-4 bg-gray-800/50 rounded-lg p-4">
            <FaShieldAlt className="text-primary-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-500 leading-relaxed">
              <strong className="text-gray-400">Disclaimer:</strong> SkyStay Travel is an independent travel agency. 
              We are not affiliated with, endorsed by, or connected to any specific airline. We compare prices across 
              multiple airlines and booking platforms to find you the best deals. A convenience fee may apply for our 
              booking services. All prices are subject to availability and may change without notice.
            </p>
          </div>
          <p className="text-center text-sm text-gray-500">
            © {currentYear} SkyStay Travel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
