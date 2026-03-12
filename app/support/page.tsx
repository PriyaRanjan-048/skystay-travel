"use client";

import { FaPhone, FaEnvelope, FaClock, FaGlobeAmericas, FaQuestionCircle, FaChevronDown, FaChevronUp, FaHeadset, FaShieldAlt } from "react-icons/fa";
import { useState } from "react";

const faqs = [
  {
    question: "How do I book a flight through SkyStay Travel?",
    answer: "Simply call our travel experts at 1-800-123-4567. Our agents will find the best flights for your dates, compare prices across airlines, and book everything for you. It's that easy!",
  },
  {
    question: "Is there a booking fee?",
    answer: "We charge a small convenience fee for our service, which covers personalized assistance, price comparison, and ongoing support for your trip. Many times, our exclusive rates more than offset this fee.",
  },
  {
    question: "Can I get a refund if I cancel my booking?",
    answer: "Cancellation policies vary depending on the airline and hotel. Our agents will clearly explain the cancellation terms before you confirm your booking. Call us to discuss your options.",
  },
  {
    question: "Do you offer travel insurance?",
    answer: "Yes! Our travel agents can recommend and add travel insurance to protect your trip. Call us to learn about coverage options and pricing.",
  },
  {
    question: "Are you affiliated with any airlines?",
    answer: "SkyStay Travel is an independent travel agency. We are not affiliated with any specific airline, which allows us to compare prices across all carriers to find you the best deal.",
  },
  {
    question: "Do you offer support in Spanish?",
    answer: "¡Sí! We have bilingual agents who are fluent in both English and Spanish. Just let us know your preferred language when you call.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and PayPal. Payment is processed securely over the phone.",
  },
  {
    question: "How early should I book my flight?",
    answer: "For the best prices, we recommend booking domestic flights 1-3 months in advance and international flights 2-6 months ahead. Call us anytime — our agents can advise you on the best booking window for your destination.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-800 pr-4">{question}</span>
        {isOpen ? (
          <FaChevronUp className="text-primary-600 flex-shrink-0" />
        ) : (
          <FaChevronDown className="text-gray-400 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function SupportPage() {
  return (
    <div className="pt-36 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary-50 text-primary-700 px-4 py-2 rounded-full mb-4 text-sm font-medium">
            <FaHeadset className="mr-2" /> Customer Support
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            We're Here to <span className="text-primary-600">Help</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our travel experts are available 24/7 to assist you with bookings, changes, and anything else you need.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Phone - Primary */}
          <div className="md:col-span-1 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl p-8 text-white text-center shadow-xl">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPhone className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">Call Us</h3>
            <p className="text-primary-100 text-sm mb-4">
              Fastest way to reach us. Average wait time: under 30 seconds.
            </p>
            <a
              href="tel:+18001234567"
              className="inline-flex items-center bg-white text-primary-700 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-primary-50 transition-all hover:scale-105 text-lg"
            >
              <FaPhone className="mr-2" />
              1-800-123-4567
            </a>
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaEnvelope className="text-2xl text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Email Us</h3>
            <p className="text-gray-600 text-sm mb-4">
              Send us your questions and we'll respond within 24 hours.
            </p>
            <a
              href="mailto:support@skystay.com"
              className="text-primary-600 font-semibold hover:text-primary-700"
            >
              support@skystay.com
            </a>
          </div>

          {/* Hours */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaClock className="text-2xl text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Hours</h3>
            <p className="text-gray-600 text-sm mb-2">
              <strong>Phone Support:</strong> 24/7, 365 days
            </p>
            <p className="text-gray-600 text-sm mb-2">
              <strong>Email Support:</strong> Mon-Fri, 9am-6pm EST
            </p>
            <div className="flex items-center justify-center text-sm text-primary-600 mt-3">
              <FaGlobeAmericas className="mr-1" />
              English & Español
            </div>
          </div>
        </div>

        {/* Trust Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: FaShieldAlt, title: "Secure Booking", desc: "All transactions are encrypted and secure" },
            { icon: FaHeadset, title: "Dedicated Agents", desc: "Personal travel advisor for your trip" },
            { icon: FaGlobeAmericas, title: "Global Coverage", desc: "Flights to 190+ countries worldwide" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <item.icon className="text-primary-600 text-xl" />
              </div>
              <div>
                <h4 className="font-bold mb-1">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center text-primary-600 mb-2">
              <FaQuestionCircle className="mr-2" />
              <span className="font-medium">Frequently Asked Questions</span>
            </div>
            <h2 className="text-3xl font-bold">Got Questions?</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          {/* Still need help */}
          <div className="mt-10 text-center bg-primary-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-2">Still Have Questions?</h3>
            <p className="text-gray-600 mb-4">Our friendly team is always just a phone call away.</p>
            <a
              href="tel:+18001234567"
              className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-primary-700 transition-all hover:scale-105"
            >
              <FaPhone className="mr-2" />
              Call 1-800-123-4567
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
