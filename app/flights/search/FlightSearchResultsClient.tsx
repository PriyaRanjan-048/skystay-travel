"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchForm from "@/components/search/SearchForm";
import {
  FaPlane,
  FaFilter,
  FaExchangeAlt,
  FaSuitcase,
  FaChevronDown,
  FaChevronUp,
  FaPhone,
} from "react-icons/fa";
import { internalDuffelApi } from "@/lib/duffel-client";
import LoadingAnimation from "@/components/ui/LoadingAnimation";

// Types for flight results as rendered by the UI (mapped from Duffel offers)
type SkyScrapperCarrier = {
  id: number;
  name: string;
  logoUrl: string;
};

type SkyScrapperLeg = {
  id: string;
  origin: {
    displayCode: string;
    city: string;
    name: string;
  };
  destination: {
    displayCode: string;
    city: string;
    name: string;
  };
  durationInMinutes: number;
  stopCount: number;
  departure: string;
  arrival: string;
  carriers: {
    marketing: SkyScrapperCarrier[];
  };
};

type SkyScrapperFlightOffer = {
  id: string;
  price: {
    raw: number;
    formatted: string;
    total?: string; // For compatibility with filters
  };
  legs: SkyScrapperLeg[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy?: any;
};

export default function FlightSearchResultsClient() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [flights, setFlights] = useState<SkyScrapperFlightOffer[]>([]);
  const [expandedFlight, setExpandedFlight] = useState<string | null>(null);

  // Filters
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedStops, setSelectedStops] = useState<number[]>([]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);

  useEffect(() => {
    // Extract search parameters
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const departureDate = searchParams.get("departure");
    const returnDate = searchParams.get("return");
    const travelersStr = searchParams.get("travelers") || "1";
    const travelers = parseInt(travelersStr);

    if (!from || !to || !departureDate) {
      setError("Missing required search parameters");
      setIsLoading(false);
      return;
    }

    // Call the Duffel API with these parameters
    fetchFlightsFromApi(from, to, departureDate, returnDate, travelers);
  }, [searchParams]);

  const parseDuration = (isoDuration: string | null): number => {
    if (!isoDuration) return 0;
    const matches = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!matches) return 0;
    const hours = parseInt(matches[1] || "0");
    const minutes = parseInt(matches[2] || "0");
    return hours * 60 + minutes;
  };

  const fetchFlightsFromApi = async (
    origin: string,
    destination: string,
    departureDate: string,
    returnDate: string | null,
    travelers: number,
    retryCount: number = 0
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      try {
        const response = await internalDuffelApi.searchFlights({
          origin,
          destination,
          departureDate,
          returnDate: returnDate || undefined,
          adults: travelers,
        });

        if (response && response.offers) {
          const offers = response.offers || [];

          // Map Duffel offers to SkyScrapperFlightOffer format
          const processedFlights: SkyScrapperFlightOffer[] = offers.map((offer: any) => ({
            id: offer.id,
            price: {
              raw: parseFloat(offer.total_amount),
              formatted: `${offer.total_currency} ${offer.total_amount}`,
              total: offer.total_amount,
            },
            legs: offer.slices.map((slice: any) => ({
              id: slice.id,
              origin: {
                displayCode: slice.origin.iata_code,
                city: slice.origin.city_name || slice.origin.name,
                name: slice.origin.name,
              },
              destination: {
                displayCode: slice.destination.iata_code,
                city: slice.destination.city_name || slice.destination.name,
                name: slice.destination.name,
              },
              durationInMinutes: parseDuration(slice.duration),
              stopCount: slice.segments.length - 1,
              departure: slice.segments[0].departing_at,
              arrival: slice.segments[slice.segments.length - 1].arriving_at,
              carriers: {
                marketing: [
                  {
                    id: 0,
                    name: slice.segments[0].marketing_carrier.name,
                    logoUrl: slice.segments[0].marketing_carrier.logo_symbol_url,
                  },
                ],
              },
            })),
            isSelfTransfer: false,
            isProtectedSelfTransfer: true,
          }));

          setFlights(processedFlights);

          if (processedFlights.length > 0) {
            const prices = processedFlights.map((flight) => flight.price.raw);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            setPriceRange([Math.floor(minPrice), Math.ceil(maxPrice)]);
          } else {
            setError(
              "No flights found for your search criteria. Duffel Test Environment might have limited routes. Try major hubs like LHR, JFK, or DEL."
            );
          }
        } else {
          setError("No flight offers returned from the server.");
        }
      } catch (apiErr: any) {
        if (retryCount < 2) {
          setTimeout(() => {
            fetchFlightsFromApi(
              origin,
              destination,
              departureDate,
              returnDate,
              travelers,
              retryCount + 1
            );
          }, 2000);
          return;
        }

        setError(
          apiErr.message || "Failed to fetch flights from Duffel. Please ensure your Test Token is valid."
        );
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFlightDetails = (flightId: string) => {
    if (expandedFlight === flightId) {
      setExpandedFlight(null);
    } else {
      setExpandedFlight(flightId);
    }
  };

  // Helper function to get all airline names from a flight offer
  const getAirlinesFromFlight = (flight: SkyScrapperFlightOffer): string[] => {
    const airlines = new Set<string>();
    flight.legs.forEach((leg) => {
      leg.carriers.marketing.forEach((carrier) => {
        airlines.add(carrier.name);
      });
    });
    return Array.from(airlines);
  };

  // Helper function to get number of stops for a leg
  const getStopsFromLeg = (leg: SkyScrapperLeg): number => {
    return leg.stopCount;
  };

  const filteredFlights = flights.filter((flight) => {
    // Filter by price range
    const flightPrice = flight.price.raw;
    if (flightPrice < priceRange[0] || flightPrice > priceRange[1]) {
      return false;
    }

    // Filter by stops (check outbound journey)
    if (selectedStops.length > 0) {
      const outboundStops = getStopsFromLeg(flight.legs[0]);
      if (!selectedStops.includes(outboundStops)) {
        return false;
      }
    }

    // Filter by airlines
    if (selectedAirlines.length > 0) {
      const flightAirlines = getAirlinesFromFlight(flight);
      const hasSelectedAirline = flightAirlines.some((airline) =>
        selectedAirlines.includes(airline)
      );
      if (!hasSelectedAirline) {
        return false;
      }
    }

    return true;
  });

  // Get unique airlines from all flights for the filter
  const airlines: string[] = [];
  flights.forEach((flight) => {
    getAirlinesFromFlight(flight).forEach((airline) => {
      if (!airlines.includes(airline)) {
        airlines.push(airline);
      }
    });
  });

  // Format duration (e.g., 150 -> 2h 30m)
  const formatDuration = (minutes: number): string => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  // Format time from ISO date string
  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Format date from ISO date string
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  return (
    <div className="pt-36 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Search Form */}
        <div className="mb-8 bg-white rounded-xl shadow-md p-6">
          <SearchForm type="flights" />
        </div>

        {/* Call Our Travel Experts Banner with enhanced text */}
        <div className="mb-8 bg-gradient-to-r from-secondary-600 to-primary-600 rounded-xl shadow-md p-6 relative dark-overlay">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 z-10">
              <h2 className="text-xl md:text-2xl font-bold mb-2 text-white gradient-text-dark">
                Get Exclusive Flight Deals with Our Travel Experts
              </h2>
              <p className="text-white opacity-90 font-medium text-contrast-light">
                Our travel specialists can find you better rates and exclusive packages not available online.
              </p>
            </div>
            <a
              href="tel:+18001234567"
              className="bg-white text-primary-600 hover:bg-gray-100 transition-colors px-6 py-3 rounded-full font-bold flex items-center text-lg shadow-lg z-10"
            >
              <FaPhone className="mr-2" /> Call Now: 1-800-123-4567
            </a>
          </div>
        </div>

        {/* Results Section */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-36">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <FaFilter className="mr-2 text-primary-600" /> Filters
              </h2>

              {!isLoading && flights.length > 0 ? (
                <>
                  {/* Price Range */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Price Range</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min={priceRange[0]}
                      max={priceRange[1] * 1.5} // Add some buffer above the max price
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-primary-600"
                    />
                  </div>

                  {/* Stops */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Stops</h3>
                    <div className="space-y-2">
                      {[0, 1, 2].map((stop) => (
                        <label
                          key={stop}
                          className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
                        >
                          <input
                            type="checkbox"
                            checked={selectedStops.includes(stop)}
                            onChange={() => {
                              if (selectedStops.includes(stop)) {
                                setSelectedStops(selectedStops.filter((s) => s !== stop));
                              } else {
                                setSelectedStops([...selectedStops, stop]);
                              }
                            }}
                            className="mr-2 accent-primary-600"
                          />
                          {stop === 0 ? "Nonstop" : stop === 1 ? "1 Stop" : `${stop} Stops`}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Airlines */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Airlines</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {airlines.map((airline) => (
                        <label
                          key={airline}
                          className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
                        >
                          <input
                            type="checkbox"
                            checked={selectedAirlines.includes(airline)}
                            onChange={() => {
                              if (selectedAirlines.includes(airline)) {
                                setSelectedAirlines(selectedAirlines.filter((a) => a !== airline));
                              } else {
                                setSelectedAirlines([...selectedAirlines, airline]);
                              }
                            }}
                            className="mr-2 accent-primary-600"
                          />
                          {airline}
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded transition-colors"
                    onClick={() => {
                      const prices = flights.map((flight: SkyScrapperFlightOffer) => flight.price.raw);
                      const minPrice = Math.min(...prices);
                      const maxPrice = Math.max(...prices);

                      setSelectedStops([]);
                      setSelectedAirlines([]);
                      setPriceRange([Math.floor(minPrice), Math.ceil(maxPrice)]);
                    }}
                  >
                    Reset Filters
                  </button>
                </>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  {isLoading ? "Loading filters..." : "No filters available"}
                </div>
              )}
            </div>
          </div>

          {/* Flight Results */}
          <div className="lg:w-3/4">
            {isLoading ? (
              <LoadingAnimation message="Finding the best flights for you..." type="flights" />
            ) : error ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="text-red-500 text-5xl mb-4">
                  <FaExchangeAlt className="inline-block" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-red-600">Oops! Something went wrong</h3>
                <p className="text-gray-600 mb-4">
                  {typeof error === "string"
                    ? error
                    : "An unexpected error occurred with the search parameters."}
                </p>
                <p className="text-gray-600 mb-6">Please try adjusting your search or try again later.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : filteredFlights.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="text-primary-600 text-5xl mb-4">
                  <FaPlane className="inline-block" />
                </div>
                <h3 className="text-xl font-bold mb-2">No flights found</h3>
                <p className="text-gray-600 mb-4">We couldn't find any flights matching your criteria.</p>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search for different dates.</p>
                <button
                  className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded transition-colors"
                  onClick={() => {
                    const prices = flights.map((flight: SkyScrapperFlightOffer) => flight.price.raw);
                    const minPrice = Math.min(...prices);
                    const maxPrice = Math.max(...prices);

                    setSelectedStops([]);
                    setSelectedAirlines([]);
                    setPriceRange([Math.floor(minPrice), Math.ceil(maxPrice)]);
                  }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center mb-4">
                  <p className="text-gray-700 font-medium">{filteredFlights.length} flights found</p>
                  <select
                    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    onChange={(e) => {
                      // Sort logic would go here
                      console.log("Sort by:", e.target.value);
                    }}
                  >
                    <option value="recommended">Sort: Recommended</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="duration">Duration: Shortest</option>
                    <option value="departure-asc">Departure: Earliest</option>
                    <option value="departure-desc">Departure: Latest</option>
                  </select>
                </div>

                {filteredFlights.map((flight) => {
                  // Get outbound journey (first leg)
                  const outboundLeg = flight.legs[0];

                  // Calculate number of stops
                  const stops = outboundLeg.stopCount;

                  // Get main carrier info
                  const mainCarrier = outboundLeg.carriers.marketing[0] || { name: "Unknown", logoUrl: "" };

                  return (
                    <div
                      key={flight.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100"
                    >
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          {/* Airline */}
                          <div className="flex items-center mb-4 md:mb-0">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                              {mainCarrier.logoUrl ? (
                                <img
                                  src={mainCarrier.logoUrl}
                                  alt={mainCarrier.name}
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <span className="text-sm font-bold">
                                  {mainCarrier.name.substring(0, 2).toUpperCase()}
                                </span>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{mainCarrier.name}</p>
                              <p className="text-xs text-gray-500">Economy</p>
                            </div>
                          </div>

                          {/* Flight times */}
                          <div className="flex-grow flex flex-col md:flex-row justify-between items-center mb-4 md:mb-0">
                            <div className="text-center md:text-left">
                              <p className="text-xl font-bold text-gray-900">{formatTime(outboundLeg.departure)}</p>
                              <p className="text-sm text-gray-600 font-semibold">{outboundLeg.origin.displayCode}</p>
                              <p className="text-xs text-gray-500">{formatDate(outboundLeg.departure)}</p>
                            </div>

                            <div className="flex flex-col items-center mx-4 my-2 md:my-0">
                              <p className="text-xs text-gray-500 font-medium">
                                {formatDuration(outboundLeg.durationInMinutes)}
                              </p>
                              <div className="relative w-24 md:w-32 h-0.5 bg-gray-300 my-2">
                                {stops > 0 &&
                                  Array.from({ length: stops }).map((_, i) => (
                                    <div
                                      key={i}
                                      className="absolute top-1/2 transform -translate-y-1/2"
                                      style={{ left: `${((i + 1) / (stops + 1)) * 100}%` }}
                                    >
                                      <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                                    </div>
                                  ))}
                                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 text-gray-400">
                                  <FaPlane className="text-[10px] rotate-90" />
                                </div>
                              </div>
                              <p className="text-xs text-gray-500 font-medium">
                                {stops === 0 ? "Nonstop" : stops === 1 ? "1 Stop" : `${stops} Stops`}
                              </p>
                            </div>

                            <div className="text-center md:text-right">
                              <p className="text-xl font-bold text-gray-900">{formatTime(outboundLeg.arrival)}</p>
                              <p className="text-sm text-gray-600 font-semibold">
                                {outboundLeg.destination.displayCode}
                              </p>
                              <p className="text-xs text-gray-500">{formatDate(outboundLeg.arrival)}</p>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-center md:text-right md:ml-4 border-l-0 md:border-l border-gray-100 md:pl-6">
                            <p className="text-2xl font-bold text-primary-600">{flight.price.formatted}</p>
                            <p className="text-sm text-gray-500">per person</p>
                            <div className="mt-2">
                              <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-6 rounded-lg text-sm transition-colors shadow-sm">
                                Select
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Flight details toggle */}
                        <button
                          className="mt-4 text-primary-600 text-sm flex items-center hover:text-primary-800 font-medium transition-colors"
                          onClick={() => toggleFlightDetails(flight.id)}
                        >
                          {expandedFlight === flight.id ? (
                            <>
                              Hide details <FaChevronUp className="ml-1" />
                            </>
                          ) : (
                            <>
                              Show details <FaChevronDown className="ml-1" />
                            </>
                          )}
                        </button>

                        {/* Expanded flight details */}
                        {expandedFlight === flight.id && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                                  <FaSuitcase className="mr-2 text-primary-600" /> Journey Information
                                </h4>
                                <div className="space-y-4">
                                  {flight.legs.map((leg, lIdx) => (
                                    <div key={leg.id} className="bg-gray-50 p-3 rounded-lg">
                                      <p className="text-sm font-bold text-gray-700 mb-2">
                                        {lIdx === 0 ? "Outbound" : "Return"}: {leg.origin.city} to {leg.destination.city}
                                      </p>
                                      <div className="text-sm text-gray-600 space-y-1">
                                        <p>
                                          <span className="font-medium">Departure:</span> {leg.origin.name} (
                                          {leg.origin.displayCode})
                                        </p>
                                        <p>
                                          <span className="font-medium">Arrival:</span> {leg.destination.name} (
                                          {leg.destination.displayCode})
                                        </p>
                                        <p>
                                          <span className="font-medium">Total Duration:</span>{" "}
                                          {formatDuration(leg.durationInMinutes)}
                                        </p>
                                        <div className="mt-2 text-xs">
                                          <p className="font-medium text-gray-500">Airlines:</p>
                                          <div className="flex flex-wrap gap-2 mt-1">
                                            {leg.carriers.marketing.map((c, cIdx) => (
                                              <span
                                                key={cIdx}
                                                className="bg-white px-2 py-1 rounded border border-gray-200"
                                              >
                                                {c.name}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                                  <FaSuitcase className="mr-2 text-primary-600" /> Fare & Support
                                </h4>
                                <div className="space-y-4">
                                  <div className="bg-primary-50 p-3 rounded-lg border border-primary-100">
                                    <p className="text-sm font-bold text-primary-800 mb-1">Price Breakdown</p>
                                    <div className="flex justify-between text-sm mt-2">
                                      <span>Total Price (All taxes included)</span>
                                      <span className="font-bold text-primary-700">{flight.price.formatted}</span>
                                    </div>
                                  </div>

                                  <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                                    <p className="text-sm font-bold text-green-800 mb-1">Our Travel Experts</p>
                                    <p className="text-xs text-green-700 mb-2">
                                      Call for exclusive deals and personalized support
                                    </p>
                                    <a
                                      href="tel:+18001234567"
                                      className="inline-flex items-center text-sm font-bold text-green-700 hover:text-green-800"
                                    >
                                      <FaPhone className="mr-1" /> 1-800-123-4567
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

