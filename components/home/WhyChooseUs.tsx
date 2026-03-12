"use client";

import { FaHeadset, FaShieldAlt, FaDollarSign, FaGlobeAmericas, FaClock, FaThumbsUp } from "react-icons/fa";

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: FaHeadset,
      title: "Expert Travel Agents",
      description: "Speak with experienced specialists who know the best routes, deals, and hidden gems for every destination.",
      color: "text-primary-600",
      bg: "bg-primary-50",
    },
    {
      icon: FaClock,
      title: "Available 24/7",
      description: "Our agents are available around the clock, every day of the year. Call anytime that works for you.",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: FaDollarSign,
      title: "Phone-Only Exclusive Deals",
      description: "Access special negotiated rates and unpublished fares that are only available when you book by phone.",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      icon: FaShieldAlt,
      title: "No Hidden Fees",
      description: "Transparent pricing with no surprises. We clearly explain all costs before you confirm your booking.",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: FaGlobeAmericas,
      title: "Bilingual Support",
      description: "Our team speaks both English and Español fluently. Get help in the language you're most comfortable with.",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: FaThumbsUp,
      title: "5 Million+ Happy Travelers",
      description: "Join millions of satisfied customers who trust us for their travel bookings year after year.",
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Book With <span className="text-primary-600">SkyStay Travel</span>?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're more than just a booking platform — we're your personal travel concierge. 
            Here's why thousands of travelers choose to call us every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-14 h-14 ${benefit.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <benefit.icon className={`text-2xl ${benefit.color}`} />
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary-600 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
