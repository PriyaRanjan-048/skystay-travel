"use client";

import SearchForm from "@/components/search/SearchForm";

export default function FlightsPage() {
  return (
    <div className="pt-36 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto mb-12">
          <h1 className="text-3xl font-bold mb-6">Find and Book Flights</h1>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <SearchForm type="flights" />
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Flight Booking Tips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Best Time to Book</h3>
              <p className="text-gray-600">
                Book flights 2-3 months in advance for the best prices. For international flights, consider booking 5-6 months ahead.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Flexible Dates</h3>
              <p className="text-gray-600">
                Flying mid-week (Tuesday or Wednesday) is often cheaper than weekend travel. Consider flexible dates for better deals.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Airport Alternatives</h3>
              <p className="text-gray-600">
                Check flights from alternative nearby airports, as they may offer significantly lower fares for the same destination.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-3">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-primary-700">How early should I arrive at the airport?</h4>
                <p className="text-gray-600 mt-1">For domestic flights, arrive 2 hours before departure. For international flights, arrive 3 hours before departure.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-primary-700">Can I cancel or change my flight?</h4>
                <p className="text-gray-600 mt-1">Cancellation and change policies vary by airline and fare type. Many airlines offer flexible booking options that allow changes with minimal or no fees.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-primary-700">How can I find the cheapest flights?</h4>
                <p className="text-gray-600 mt-1">Use our flexible dates search, set price alerts, and consider booking 2-3 months in advance for domestic and 5-6 months for international flights.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
