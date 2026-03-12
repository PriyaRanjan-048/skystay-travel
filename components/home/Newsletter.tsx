"use client";

import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this to your API/backend
    console.log('Submitting email:', email);
    
    // Show success state
    if (email) {
      setSubmitted(true);
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Travel Deals & Updates
          </h2>
          <p className="mb-8 opacity-90">
            Subscribe to our newsletter and be the first to receive exclusive offers, travel tips, and destination inspiration.
          </p>
          
          <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
            {!submitted ? (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-5 py-4 pr-36 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  required
                />
                <button 
                  type="submit"
                  className="absolute right-1.5 top-1.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-full px-6 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                >
                  <span className="hidden sm:inline">Subscribe</span>
                  <FaPaperPlane className="ml-0 sm:ml-2 sm:inline" />
                </button>
              </>
            ) : (
              <div className="bg-white text-primary-600 rounded-full py-4 px-6 font-medium animate-pulse">
                Thank you for subscribing! Check your inbox soon.
              </div>
            )}
          </form>
          
          <p className="mt-4 text-sm opacity-80">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
