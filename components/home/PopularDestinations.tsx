"use client";

import { FaPhone } from "react-icons/fa";

const PopularDestinations = () => {
  const destinations = [
    { name: "Paris, France", icon: "🗼", gradient: "from-pink-500 to-rose-500", flights: "From $399" },
    { name: "Tokyo, Japan", icon: "⛩️", gradient: "from-red-500 to-orange-500", flights: "From $599" },
    { name: "Bali, Indonesia", icon: "🏝️", gradient: "from-emerald-500 to-teal-500", flights: "From $499" },
    { name: "New York, USA", icon: "🗽", gradient: "from-blue-500 to-indigo-500", flights: "From $199" },
    { name: "Rome, Italy", icon: "🏛️", gradient: "from-amber-500 to-orange-500", flights: "From $449" },
    { name: "Cancún, Mexico", icon: "🌴", gradient: "from-cyan-500 to-blue-500", flights: "From $249" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Popular Destinations
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our most booked destinations. Call for the latest prices and availability!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {destinations.map((dest, idx) => (
            <a
              key={idx}
              href="tel:+18001234567"
              className="group block"
            >
              <div className={`relative bg-gradient-to-br ${dest.gradient} rounded-2xl overflow-hidden aspect-square flex flex-col items-center justify-center p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                <span className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">{dest.icon}</span>
                <h3 className="text-white font-bold text-sm text-center mb-1">{dest.name}</h3>
                <p className="text-white/80 text-xs">{dest.flights}</p>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <FaPhone className="mx-auto mb-2 text-lg" />
                    <span className="text-sm font-medium">Call to Book</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
