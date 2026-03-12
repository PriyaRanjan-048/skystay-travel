"use client";

import { useState } from "react";
import SearchForm from "@/components/search/SearchForm";
import { FaPhone, FaPlane, FaHotel, FaSuitcaseRolling } from "react-icons/fa";

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("flights");

  return (
    <section className="relative min-h-screen pb-16 pt-32 flex items-center">
      {/* CSS Gradient Background (no image dependency) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-primary-900 to-secondary-900">
        {/* Decorative floating shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary-400/5 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 mt-10">
        <div className="text-center text-white mb-8">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 text-sm">
            <FaPhone className="mr-2 text-primary-300 animate-pulse" />
            <span className="text-primary-200">Call our experts for exclusive deals not available online</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
            Book Flights at the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-300">
              Best Prices
            </span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300 animate-slide-up mb-6">
            Search flights, hotels, and vacation packages — or call our travel experts for personalized deals
          </p>
          
          {/* Call CTA */}
          <a
            href="tel:+18001234567"
            className="inline-flex items-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform mb-8 animate-slide-up"
          >
            <FaPhone className="mr-2" />
            Call Now: 1-800-123-4567
          </a>
        </div>

        {/* Search Tabs & Form */}
        <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-sm rounded-xl shadow-search overflow-hidden animate-slide-up animation-delay-200">
          {/* Tabs */}
          <div className="flex border-b">
            {[
              { id: "flights", label: "Flights", icon: FaPlane },
              { id: "hotels", label: "Hotels", icon: FaHotel },
              { id: "packages", label: "Flight + Hotel", icon: FaSuitcaseRolling },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`flex-1 py-4 px-2 text-center font-medium text-sm md:text-base transition-colors flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-primary-50 text-primary-700 border-b-2 border-primary-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="text-sm" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Form */}
          <div className="p-4 md:p-6">
            <SearchForm type={activeTab as "flights" | "hotels" | "packages"} />
          </div>

          {/* Or Call Banner inside search */}
          <div className="bg-gray-50 border-t px-6 py-3 flex items-center justify-center gap-3 text-sm">
            <span className="text-gray-500">Prefer personalized help?</span>
            <a
              href="tel:+18001234567"
              className="text-primary-600 font-semibold hover:text-primary-700 flex items-center"
            >
              <FaPhone className="mr-1 text-xs" />
              Call our experts
            </a>
          </div>
        </div>

        {/* Stats Below Search */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
          {[
            { label: "Airlines", value: "10,000+", icon: "✈️" },
            { label: "Hotels", value: "100,000+", icon: "🏨" },
            { label: "Happy Customers", value: "5 Million+", icon: "⭐" },
            { label: "Customer Support", value: "24/7", icon: "📞" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl py-8 px-2 shadow-lg hover:bg-white/15 transition-colors">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
