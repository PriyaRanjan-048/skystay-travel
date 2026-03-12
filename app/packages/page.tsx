"use client";

import SearchForm from "@/components/search/SearchForm";

export default function PackagesPage() {
  return (
    <div className="pt-36 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto mb-12">
          <h1 className="text-3xl font-bold mb-6">Flight + Hotel Packages</h1>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <SearchForm type="packages" />
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Why Book a Package?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Save Money</h3>
              <p className="text-gray-600">
                Booking flights and hotels together can save you up to 30% compared to booking them separately.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Save Time</h3>
              <p className="text-gray-600">
                Bundle your bookings in one transaction instead of searching for flights and hotels separately.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Simplified Planning</h3>
              <p className="text-gray-600">
                Ensure your flight and hotel dates align perfectly and manage all your travel details in one place.
              </p>
            </div>
          </div>
          
          <div className="bg-primary-50 p-8 rounded-xl border border-primary-100 mb-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-xl font-bold text-primary-800 mb-2">Package Deal of the Month</h3>
                <h4 className="text-2xl font-bold mb-3">Paris Getaway - 30% OFF</h4>
                <p className="text-gray-700 mb-4">
                  7 nights in the heart of Paris with round-trip flights, daily breakfast, and a Seine River cruise.
                </p>
                <p className="text-lg">
                  <span className="line-through text-gray-500 mr-2">$2,499</span>
                  <span className="font-bold text-primary-700">$1,749</span>
                  <span className="text-sm text-gray-500"> per person</span>
                </p>
              </div>
              <button className="btn btn-primary">View Deal</button>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-3">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-primary-700">What's included in a flight + hotel package?</h4>
                <p className="text-gray-600 mt-1">Packages typically include round-trip flights and hotel accommodations. Some may also include airport transfers, breakfast, or activities.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-primary-700">Can I customize my package?</h4>
                <p className="text-gray-600 mt-1">Yes, most packages allow customization such as upgrading room types, adding extra nights, changing flight classes, or adding car rentals.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-primary-700">What if I need to cancel my package?</h4>
                <p className="text-gray-600 mt-1">Cancellation policies vary by package. Many offer flexible booking options, and some include travel insurance coverage for added peace of mind.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
