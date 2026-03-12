"use client";

import SearchForm from "@/components/search/SearchForm";

export default function HotelsPage() {
  return (
    <div className="pt-36 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto mb-12">
          <h1 className="text-3xl font-bold mb-6">Find and Book Hotels</h1>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <SearchForm type="hotels" />
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Hotel Booking Tips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Location Matters</h3>
              <p className="text-gray-600">
                Choose hotels near public transportation or major attractions to save time and money on local transportation during your stay.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Read the Reviews</h3>
              <p className="text-gray-600">
                Check recent guest reviews to get real insights about the property, service quality, cleanliness, and neighborhood safety.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Check Included Amenities</h3>
              <p className="text-gray-600">
                Look for hotels that include free breakfast, Wi-Fi, parking, or resort credits as these can add significant value to your stay.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-3">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-primary-700">What's the difference between hotel categories (stars)?</h4>
                <p className="text-gray-600 mt-1">Star ratings typically indicate the level of amenities, service, and overall quality. 5-star hotels offer luxury amenities and service, while 3-star hotels provide comfortable basics.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-primary-700">Is it better to book hotels in advance or last minute?</h4>
                <p className="text-gray-600 mt-1">For popular destinations or during peak season, booking 2-3 months in advance is recommended. For off-peak travel, last-minute deals can sometimes offer significant savings.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-primary-700">Can I request special accommodations?</h4>
                <p className="text-gray-600 mt-1">Yes, most hotels can accommodate special requests such as room preferences, accessibility needs, or dietary restrictions. Add these requests during booking or contact the hotel directly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
