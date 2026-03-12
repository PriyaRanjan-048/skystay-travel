"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlane, FaExchangeAlt, FaCalendarAlt, FaUser, FaSearch, FaHotel, FaSuitcase, FaMapMarkerAlt, FaSpinner } from "react-icons/fa";
import { internalDuffelApi } from "@/lib/duffel-client";

type SearchFormProps = {
  type: "flights" | "hotels" | "packages";
};

const SearchForm = ({ type }: SearchFormProps) => {
  const router = useRouter();
  // Flight form state
  const [flightType, setFlightType] = useState<"round-trip" | "one-way">("one-way");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [fromIata, setFromIata] = useState("");
  const [toIata, setToIata] = useState("");
  const [departureDate, setDepartureDate] = useState<Date | null>(new Date());
  const [returnDate, setReturnDate] = useState<Date | null>(
    new Date(new Date().setDate(new Date().getDate() + 7))
  );
  const [travelers, setTravelers] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationSuggestions, setLocationSuggestions] = useState<Record<string, any[]>>({
    from: [],
    to: []
  });
  const [isLoadingLocation, setIsLoadingLocation] = useState<Record<string, boolean>>({
    from: false,
    to: false
  });

  // Hotel form state
  const [destination, setDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState<Date | null>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(
    new Date(new Date().setDate(new Date().getDate() + 3))
  );
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);

  // Form validation
  const validateFlightForm = () => {
    if (!fromLocation) {
      setError("Please enter a departure location");
      return false;
    }
    if (!toLocation) {
      setError("Please enter a destination");
      return false;
    }
    if (!departureDate) {
      setError("Please select a departure date");
      return false;
    }
    if (flightType === "round-trip" && !returnDate) {
      setError("Please select a return date");
      return false;
    }
    
    // Check if departure date is not in the past
    if (departureDate && departureDate < new Date(new Date().setHours(0, 0, 0, 0))) {
      setError("Departure date cannot be in the past");
      return false;
    }
    
    // Check if return date is after departure date
    if (flightType === "round-trip" && departureDate && returnDate && returnDate < departureDate) {
      setError("Return date must be after departure date");
      return false;
    }
    
    setError(null);
    return true;
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (type === "flights" && !validateFlightForm()) {
      return;
    }
    
    setIsLoading(true);

    try {
      if (type === "flights") {
        // Format dates as YYYY-MM-DD for the API
        const formatDate = (date: Date | null) => {
          if (!date) return "";
          return date.toISOString().split('T')[0];
        };

        // Extract IATA codes as fallback if IDs aren't set
        const extractIataCode = (location: string): string => {
          const iataMatch = location.match(/^([A-Z]{3})\s*-/i);
          if (iataMatch) return iataMatch[1].toUpperCase();
          const anyIataMatch = location.match(/\b([A-Z]{3})\b/i);
          if (anyIataMatch) return anyIataMatch[1].toUpperCase();
          return location.trim().substring(0, 3).toUpperCase();
        };

        // Get the final IATA codes
        const getIataCode = (locationName: string, currentIata: string) => {
          if (currentIata) return currentIata;
          
          const code = extractIataCode(locationName);
          return code;
        };

        const fromCode = getIataCode(fromLocation, fromIata);
        const toCode = getIataCode(toLocation, toIata);
        
        if (!fromCode || !toCode) {
          setError("Please enter valid airport or city codes");
          setIsLoading(false);
          return;
        }
        
        if (fromCode === toCode) {
          setError("Origin and destination cannot be the same");
          setIsLoading(false);
          return;
        }
        
        // Build the search URL parameters
        const params = new URLSearchParams({
          from: fromCode,
          to: toCode,
          departure: formatDate(departureDate),
          travelers: travelers.toString(),
        });
        
        if (flightType === "round-trip" && returnDate) {
          params.append('return', formatDate(returnDate));
        }
        
        console.log(`Searching flights: ${fromCode} to ${toCode} on ${formatDate(departureDate)}`);
        
        // Navigate to the search results page with proper parameters
        router.push(`/flights/search?${params.toString()}`);
      } else if (type === "hotels") {
        // Handle hotel search similarly
        const formatDate = (date: Date | null) => {
          if (!date) return "";
          return date.toISOString().split('T')[0];
        };
        
        const params = new URLSearchParams({
          destination: destination,
          checkIn: formatDate(checkInDate),
          checkOut: formatDate(checkOutDate),
          rooms: rooms.toString(),
          guests: guests.toString(),
        });
        
        router.push(`/hotels/search?${params.toString()}`);
      } else if (type === "packages") {
        // Handle package search
        const formatDate = (date: Date | null) => {
          if (!date) return "";
          return date.toISOString().split('T')[0];
        };
        
        const params = new URLSearchParams({
          from: fromLocation.split('-')[0].trim(),
          to: toLocation.split('-')[0].trim(),
          departure: formatDate(departureDate),
          return: formatDate(returnDate),
          travelers: travelers.toString(),
          rooms: rooms.toString(),
        });
        
        router.push(`/packages/search?${params.toString()}`);
      }
    } catch (err: any) {
      console.error("Error during search:", err);
      setError(err.message || "An error occurred during search");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle location search
  const handleLocationSearch = async (
    query: string, 
    type: 'from' | 'to'
  ) => {
    if (query.length < 2) {
      setLocationSuggestions(prev => ({ ...prev, [type]: [] }));
      return;
    }
    
    setIsLoadingLocation(prev => ({ ...prev, [type]: true }));
    
    try {
      // Implement location search API call here
      const results = await fetchLocationSuggestions(query);
      setLocationSuggestions(prev => ({ ...prev, [type]: results }));
    } catch (error) {
      console.error(`Error searching ${type} locations:`, error);
    } finally {
      setIsLoadingLocation(prev => ({ ...prev, [type]: false }));
    }
  };

  // Location suggestions via our internal API (Duffel-backed)
  const fetchLocationSuggestions = async (query: string): Promise<any[]> => {
    if (query.length < 2) return [];
    
    try {
      // Call our internal API to search locations
      const response = await internalDuffelApi.searchLocations(query);
      
      if (response && response.length > 0) {
        return response.map((item: any) => ({
          iataCode: item.iata_code || '',
          name: item.name || '',
          countryName: item.country_name || '',
          city_name: item.city_name || '',
          type: item.type || ''
        }));
      }
      
      return [];
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      
      // Fallback data if API fails
      return [
        { iataCode: "DEL", name: "Delhi", countryName: "India" },
        { iataCode: "BOM", name: "Mumbai", countryName: "India" },
        { iataCode: "CCU", name: "Kolkata", countryName: "India" },
        { iataCode: "MAA", name: "Chennai", countryName: "India" },
        { iataCode: "BLR", name: "Bangalore", countryName: "India" },
        { iataCode: "PAT", name: "Patna", countryName: "India" },
      ].filter(location => 
        location.name.toLowerCase().includes(query.toLowerCase()) || 
        location.iataCode.toLowerCase().includes(query.toLowerCase())
      );
    }
  };

  // Swap departure and destination locations
  const swapLocations = () => {
    const tempLoc = fromLocation;
    const tempIata = fromIata;
    setFromLocation(toLocation);
    setFromIata(toIata);
    setToLocation(tempLoc);
    setToIata(tempIata);
  };

  // Render the form based on the type
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {type === "flights" && (
        <>
          {/* Trip Type Selection */}
          <div className="flex space-x-4 mb-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="tripType"
                checked={flightType === "round-trip"}
                onChange={() => setFlightType("round-trip")}
                className="text-primary-600 focus:ring-primary-500"
              />
              <span>Round Trip</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="tripType"
                checked={flightType === "one-way"}
                onChange={() => setFlightType("one-way")}
                className="text-primary-600 focus:ring-primary-500"
              />
              <span>One Way</span>
            </label>
          </div>
          
          {/* From and To Fields */}
          <div className="grid md:grid-cols-2 gap-4 relative">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <div className="relative">
                <FaPlane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="City or Airport"
                  value={fromLocation}
                  onChange={(e) => {
                    setFromLocation(e.target.value);
                    handleLocationSearch(e.target.value, 'from');
                  }}
                  className="pl-10 pr-3 py-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                />
                {isLoadingLocation.from && (
                  <FaSpinner className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 animate-spin" />
                )}
                
                {/* Location suggestions dropdown */}
                {locationSuggestions.from.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
                    {locationSuggestions.from.map((location, idx) => (
                      <div
                        key={`${location.iataCode}-${idx}`}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b last:border-0"
                        onClick={() => {
                          setFromLocation(`${location.iataCode} - ${location.name}, ${location.countryName}`);
                          setFromIata(location.iataCode);
                          setLocationSuggestions(prev => ({ ...prev, from: [] }));
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="font-bold text-primary-700">{location.iataCode}</span>
                            <span className="text-sm text-gray-600">{location.name}</span>
                          </div>
                          <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-500 uppercase tracking-wider">{location.type || location.subType || 'Airport'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Swap locations button */}
            <button
              type="button"
              onClick={swapLocations}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow z-10 hidden md:flex"
            >
              <FaExchangeAlt className="text-primary-600" />
            </button>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <div className="relative">
                <FaPlane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 rotate-90" />
                <input
                  type="text"
                  placeholder="City or Airport"
                  value={toLocation}
                  onChange={(e) => {
                    setToLocation(e.target.value);
                    handleLocationSearch(e.target.value, 'to');
                  }}
                  className="pl-10 pr-3 py-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                />
                {isLoadingLocation.to && (
                  <FaSpinner className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 animate-spin" />
                )}
                
                {/* Location suggestions dropdown */}
                {locationSuggestions.to.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
                    {locationSuggestions.to.map((location, idx) => (
                      <div
                        key={`${location.iataCode}-${idx}`}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b last:border-0"
                        onClick={() => {
                          setToLocation(`${location.iataCode} - ${location.name}, ${location.countryName}`);
                          setToIata(location.iataCode);
                          setLocationSuggestions(prev => ({ ...prev, to: [] }));
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="font-bold text-primary-700">{location.iataCode}</span>
                            <span className="text-sm text-gray-600">{location.name}</span>
                          </div>
                          <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-500 uppercase tracking-wider">{location.type || location.subType || 'Airport'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Date and Travelers */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <DatePicker
                  selected={departureDate}
                  onChange={(date) => setDepartureDate(date)}
                  className="pl-10 pr-3 py-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  required
                />
              </div>
            </div>
            
            {flightType === "round-trip" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <DatePicker
                    selected={returnDate}
                    onChange={(date) => setReturnDate(date)}
                    className="pl-10 pr-3 py-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    dateFormat="dd/MM/yyyy"
                    minDate={departureDate || new Date()}
                    required={flightType === "round-trip"}
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(parseInt(e.target.value))}
                  className="pl-10 pr-3 py-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Traveler" : "Travelers"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </>
      )}

      {type === "hotels" && (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="City or Location"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-10 pr-3 py-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <DatePicker
                  selected={checkInDate}
                  onChange={(date) => setCheckInDate(date)}
                  className="pl-10 pr-3 py-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <DatePicker
                  selected={checkOutDate}
                  onChange={(date) => setCheckOutDate(date)}
                  className="pl-10 pr-3 py-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  dateFormat="dd/MM/yyyy"
                  minDate={checkInDate || new Date()}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rooms</label>
              <div className="relative">
                <FaHotel className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={rooms}
                  onChange={(e) => setRooms(parseInt(e.target.value))}
                  className="pl-10 pr-3 py-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 appearance-none"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Room" : "Rooms"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="pl-10 pr-3 py-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </>
      )}

      {type === "packages" && (
        <>
          {/* Combined Flight + Hotel form */}
          <div className="grid md:grid-cols-2 gap-4 relative">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <div className="relative">
                <FaPlane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="City or Airport"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  className="pl-10 pr-3 py-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Destination"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  className="pl-10 pr-3 py-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departure</label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <DatePicker
                  selected={departureDate}
                  onChange={(date) => setDepartureDate(date)}
                  className="pl-10 pr-3 py-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Return</label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <DatePicker
                  selected={returnDate}
                  onChange={(date) => setReturnDate(date)}
                  className="pl-10 pr-3 py-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  dateFormat="dd/MM/yyyy"
                  minDate={departureDate || new Date()}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(parseInt(e.target.value))}
                  className="pl-10 pr-3 py-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Traveler" : "Travelers"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rooms</label>
              <div className="relative">
                <FaHotel className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={rooms}
                  onChange={(e) => setRooms(parseInt(e.target.value))}
                  className="pl-10 pr-3 py-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 appearance-none"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Room" : "Rooms"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Error message */}
      {error && (
        <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-200">
          {typeof error === 'string' ? error : "An unexpected error occurred."}
        </div>
      )}
      
      {/* Search Button */}
      <div className="text-center">
        <button
          type="submit"
          className={`px-6 py-3 rounded-lg font-medium text-white shadow-md transition-colors ${
            isLoading 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-primary-600 hover:bg-primary-700"
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin inline-block mr-2" />
              Searching...
            </>
          ) : (
            <>
              <FaSearch className="inline-block mr-2" />
              {type === "flights" 
                ? "Search Flights" 
                : type === "hotels" 
                  ? "Search Hotels" 
                  : "Search Packages"
              }
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
