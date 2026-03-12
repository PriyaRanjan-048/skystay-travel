"use client";

import { FaPhone, FaStar, FaTag } from "react-icons/fa";

const FeaturedDeals = () => {
  const deals = [
    {
      id: 1,
      title: "New York City Getaway",
      description: "Flight + 3 nights hotel stay in Manhattan",
      oldPrice: 1299,
      newPrice: 899,
      discount: 30,
      rating: 4.8,
      reviews: 245,
      gradient: "from-orange-500 to-pink-500",
      icon: "🗽",
    },
    {
      id: 2,
      title: "Beach Paradise in Bali",
      description: "7 nights luxury beach resort with flights",
      oldPrice: 2499,
      newPrice: 1899,
      discount: 24,
      rating: 4.9,
      reviews: 312,
      gradient: "from-cyan-500 to-blue-500",
      icon: "🏝️",
    },
    {
      id: 3,
      title: "London Adventure",
      description: "Flight + 4 nights hotel + city tour",
      oldPrice: 1599,
      newPrice: 1199,
      discount: 25,
      rating: 4.7,
      reviews: 189,
      gradient: "from-purple-500 to-indigo-500",
      icon: "🇬🇧",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Travel Deals
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Exclusive package deals to popular destinations. Call our agents to lock in these prices!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Card Header with Gradient */}
              <div className={`relative h-48 bg-gradient-to-br ${deal.gradient} flex items-center justify-center`}>
                <span className="text-7xl group-hover:scale-110 transition-transform duration-300">{deal.icon}</span>
                <div className="absolute top-4 right-4 bg-white text-primary-600 text-sm font-bold py-1.5 px-3 rounded-full shadow-md">
                  <FaTag className="inline mr-1" />
                  {deal.discount}% OFF
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">{deal.title}</h3>
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

                {/* Price + CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-400 line-through text-sm">${deal.oldPrice}</span>
                    <div className="text-xl font-bold text-primary-600">${deal.newPrice}</div>
                    <div className="text-xs text-gray-500">per person</div>
                  </div>
                  <a
                    href="tel:+18001234567"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center transition-colors"
                  >
                    <FaPhone className="mr-1.5 text-xs" />
                    Call to Book
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/deals"
            className="btn btn-outline inline-flex items-center"
          >
            View All Deals →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDeals;
