/**
 * Client-side wrapper for the internal Next.js API routes.
 * This avoids bundling the Duffel SDK on the client side.
 */

export class InternalDuffelClient {
  async searchLocations(query: string) {
    if (!query || query.length < 2) return [];
    
    const response = await fetch(`/api/locations/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch suggestions");
    }
    return response.json();
  }

  async searchFlights(params: {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    adults: number;
  }) {
    const urlParams = new URLSearchParams({
      from: params.origin,
      to: params.destination,
      departure: params.departureDate,
      travelers: params.adults.toString(),
    });

    if (params.returnDate) {
      urlParams.append("return", params.returnDate);
    }

    const response = await fetch(`/api/flights/search?${urlParams.toString()}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch flight offers");
    }
    
    const data = await response.json();
    return data;
  }
}

export const internalDuffelApi = new InternalDuffelClient();
