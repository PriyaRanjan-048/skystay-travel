"use client";

import { FaPhone, FaPlane, FaStar, FaTag, FaClock } from "react-icons/fa";

const deals = [
  {
    id: 1,
    title: "New York City Getaway",
    description: "Flight + 3 nights hotel stay in Manhattan. Experience the vibrant culture of NYC!",
    oldPrice: 1299,
    newPrice: 899,
    discount: 30,
    rating: 4.8,
    reviews: 245,
    gradient: "from-orange-500 to-pink-500",
    icon: "🗽",
    duration: "4 days / 3 nights",
  },
  {
    id: 2,
    title: "Beach Paradise in Bali",
    description: "7 nights in a luxury beach resort with flights and daily breakfast included.",
    oldPrice: 2499,
    newPrice: 1899,
    discount: 24,
    rating: 4.9,
    reviews: 312,
    gradient: "from-cyan-500 to-blue-500",
    icon: "🏝️",
    duration: "8 days / 7 nights",
  },
  {
    id: 3,
    title: "London Adventure",
    description: "Flight + 4 nights hotel stay with complimentary city tour included.",
    oldPrice: 1599,
    newPrice: 1199,
    discount: 25,
    rating: 4.7,
    reviews: 189,
    gradient: "from-purple-500 to-indigo-500",
    icon: "🇬🇧",
    duration: "5 days / 4 nights",
  },
  {
    id: 4,
    title: "Tokyo Experience",
    description: "Explore Japan's capital with flights, 5 nights hotel, and cultural tours.",
    oldPrice: 2899,
    newPrice: 2199,
    discount: 24,
    rating: 4.9,
    reviews: 278,
    gradient: "from-red-500 to-rose-500",
    icon: "🗼",
    duration: "6 days / 5 nights",
  },
  {
    id: 5,
    title: "Paris Romance",
    description: "The city of love awaits! Flight + 4 nights in a charming boutique hotel.",
    oldPrice: 1799,
    newPrice: 1349,
    discount: 25,
    rating: 4.8,
    reviews: 356,
    gradient: "from-pink-500 to-fuchsia-500",
    icon: "🗼",
    duration: "5 days / 4 nights",
  },
  {
    id: 6,
    title: "Cancún All-Inclusive",
    description: "7 nights all-inclusive resort on the beach with flights. Paradise awaits!",
    oldPrice: 2199,
    newPrice: 1599,
    discount: 27,
    rating: 4.7,
    reviews: 421,
    gradient: "from-emerald-500 to-teal-500",
    icon: "🌴",
    duration: "8 days / 7 nights",
  },
];

export default function DealsPage() {
  return (
    <div className="pt-36 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Exclusive <span className="text-primary-600">Travel Deals</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
            These special packages are available exclusively through our travel agents. 
            Call now to lock in these prices before they're gone!
          </p>
          <a
            href="tel:+18001234567"
            className="inline-flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
          >
            <FaPhone className="mr-2" />
            Call for Best Prices: 1-800-123-4567
          </a>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Card Header with Gradient */}
              <div className={`relative h-48 bg-gradient-to-br ${deal.gradient} flex items-center justify-center`}>
                <span className="text-7xl">{deal.icon}</span>
                <div className="absolute top-4 right-4 bg-white text-primary-600 text-sm font-bold py-1.5 px-3 rounded-full shadow-md">
                  <FaTag className="inline mr-1" />
                  {deal.discount}% OFF
                </div>
                <div className="absolute bottom-4 left-4 bg-black/30 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center">
                  <FaClock className="mr-1" />
                  {deal.duration}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                  {deal.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{deal.description}</p>

                {/* Rating */}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <div className="flex items-center text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(deal.rating) ? "text-yellow-400" : "text-gray-300"} size={12} />
                    ))}
                  </div>
                  <span className="font-medium text-gray-700">{deal.rating}</span>
                  <span className="mx-1">•</span>
                  <span>{deal.reviews} reviews</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-gray-400 line-through text-sm">${deal.oldPrice}</span>
                    <div className="text-2xl font-bold text-primary-600">${deal.newPrice}</div>
                    <div className="text-xs text-gray-500">per person</div>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="tel:+18001234567"
                  className="w-full flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-xl transition-colors"
                >
                  <FaPhone className="mr-2 text-sm" />
                  Call to Book This Deal
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-10 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Don't See What You're Looking For?
          </h2>
          <p className="text-primary-100 mb-6 max-w-xl mx-auto">
            Our travel agents can create custom packages tailored to your needs and budget. 
            Call us for personalized recommendations!
          </p>
          <a
            href="tel:+18001234567"
            className="inline-flex items-center bg-white text-primary-700 px-8 py-3 rounded-full font-bold text-lg shadow-xl hover:bg-primary-50 transition-all hover:scale-105"
          >
            <FaPhone className="mr-2" />
            1-800-123-4567
          </a>
        </div>
      </div>
    </div>
  );
}
