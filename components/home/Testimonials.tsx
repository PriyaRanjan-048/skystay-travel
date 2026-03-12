"use client";

import { FaStar, FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      initials: "SM",
      role: "Frequent Traveler",
      color: "bg-primary-500",
      rating: 5,
      text: "I called SkyStay to book a last-minute flight to London and they saved me over $400! The agent was incredibly helpful and found me a deal I couldn't find online.",
    },
    {
      name: "Carlos R.",
      initials: "CR",
      role: "Family Vacation",
      color: "bg-secondary-500",
      rating: 5,
      text: "¡Excelente servicio! Me encantó poder hablar en español con el agente. Nos ayudó a planificar unas vacaciones increíbles para toda la familia en Cancún.",
    },
    {
      name: "Jennifer K.",
      initials: "JK",
      role: "Business Traveler",
      color: "bg-purple-500",
      rating: 5,
      text: "As someone who travels frequently for work, having a dedicated phone agent who knows my preferences has been a game-changer. They always find me the best routes.",
    },
    {
      name: "Miguel A.",
      initials: "MA",
      role: "Honeymoon Trip",
      color: "bg-rose-500",
      rating: 5,
      text: "Booked our honeymoon to Bali through SkyStay. The agent helped us plan everything — flights, hotel, even airport transfers. The whole experience was seamless!",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join millions of happy travelers who book by phone for better deals and personal service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary-200 relative"
            >
              <FaQuoteLeft className="text-primary-200 text-2xl mb-4" />
              
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                {testimonial.text}
              </p>

              <div className="flex items-center">
                {/* Avatar with initials */}
                <div className={`w-10 h-10 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-sm mr-3`}>
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-gray-500 text-xs">{testimonial.role}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex items-center mt-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xs mr-0.5" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
