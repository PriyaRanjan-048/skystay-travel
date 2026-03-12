"use client";

import { useState } from "react";
import { FaPhone, FaTimes } from "react-icons/fa";

const FloatingCallButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip */}
      {showTooltip && (
        <div className="bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-2xl max-w-[220px] animate-fade-in relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1 right-2 text-gray-400 hover:text-white"
          >
            <FaTimes size={10} />
          </button>
          <p className="font-semibold mb-1">Need help booking?</p>
          <p className="text-gray-300 text-xs mb-2">Call our travel experts for exclusive deals!</p>
          <a
            href="tel:+18001234567"
            className="text-primary-300 font-bold text-sm hover:text-primary-200"
          >
            1-800-123-4567
          </a>
        </div>
      )}

      {/* Floating Button */}
      <a
        href="tel:+18001234567"
        className="group relative bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110"
        onMouseEnter={() => setShowTooltip(true)}
        aria-label="Call to book"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30"></span>
        <span className="absolute inset-0 rounded-full bg-green-400 animate-pulse opacity-20"></span>
        
        <FaPhone className="text-2xl relative z-10 transform -rotate-12" />
      </a>

      {/* Label below button on desktop */}
      <span className="hidden md:block bg-gray-900 text-white text-xs px-3 py-1 rounded-full shadow-lg font-medium -mt-1">
        Call to Book
      </span>
    </div>
  );
};

export default FloatingCallButton;
