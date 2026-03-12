"use client";

import { FaPhone, FaHeadset, FaShieldAlt, FaGlobeAmericas, FaClock } from "react-icons/fa";

const CallBanner = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary-700 via-primary-800 to-secondary-800 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Book by Phone?
          </h2>
          <p className="text-primary-200 text-lg max-w-2xl mx-auto">
            Our travel experts find you better deals than any website. 
            Call now and save up to 40% on flights!
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            {
              icon: FaHeadset,
              title: "Expert Agents",
              description: "Speak with experienced travel specialists who know the best routes and deals",
            },
            {
              icon: FaClock,
              title: "24/7 Available",
              description: "Call anytime, day or night. Our agents are always ready to help you book",
            },
            {
              icon: FaShieldAlt,
              title: "Best Price Guarantee",
              description: "We match or beat any online price you find. No hidden fees, ever",
            },
            {
              icon: FaGlobeAmericas,
              title: "English & Español",
              description: "Bilingual support for both English and Spanish speaking travelers",
            },
          ].map((benefit, idx) => (
            <div
              key={idx}
              className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
            >
              <benefit.icon className="text-primary-300 text-3xl mb-4 mx-auto" />
              <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
              <p className="text-primary-200 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="tel:+18001234567"
            className="inline-flex items-center bg-white text-primary-700 hover:bg-primary-50 transition-all duration-300 px-10 py-4 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transform"
          >
            <FaPhone className="mr-3 animate-pulse" />
            Call Now: 1-800-123-4567
          </a>
          <p className="mt-4 text-primary-300 text-sm">
            Average wait time: under 30 seconds • No booking fees
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallBanner;
