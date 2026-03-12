import { Duffel } from "@duffel/api";

function getDuffelToken() {
  const token = process.env.DUFFEL_ACCESS_TOKEN;
  if (!token) {
    throw new Error(
      "DUFFEL_ACCESS_TOKEN is not set. Add it to your environment (e.g. Vercel Project Settings → Environment Variables) and redeploy."
    );
  }
  return token;
}

function getDuffelClient() {
  return new Duffel({ token: getDuffelToken() });
}

export class DuffelClient {
  /**
   * Search for locations (airports and cities) using Duffel
   * Returns a list of places with IATA codes
   */
  async searchLocations(query: string) {
    try {
      if (!query || query.length < 2) return [];

      const duffel = getDuffelClient();
      const response = await duffel.suggestions.list({ query });
      
      // Filter for airports and cities and return in a consistent format
      return response.data.map((place: any) => ({
        iata_code: place.iata_code || place.iata_city_code,
        name: place.name,
        city_name: place.city_name || place.name,
        country_name: place.country_name,
        type: place.type, // 'airport' or 'city'
      }));
    } catch (error) {
      console.error('Error searching locations with Duffel:', error);
      throw error;
    }
  }

  /**
   * Search for flights using Duffel
   * This creates an OfferRequest and returns the resulting Offers
   */
  async searchFlights(params: {
    origin: string; // IATA code
    destination: string; // IATA code
    departureDate: string; // YYYY-MM-DD
    returnDate?: string; // YYYY-MM-DD
    adults: number;
    cabinClass?: 'economy' | 'premium_economy' | 'business' | 'first';
  }) {
    try {
      const passengers = Array(params.adults).fill({ type: 'adult' });
      
      const slices: any[] = [
        {
          origin: params.origin,
          destination: params.destination,
          departure_date: params.departureDate,
        },
      ];

      if (params.returnDate) {
        slices.push({
          origin: params.destination,
          destination: params.origin,
          departure_date: params.returnDate,
        });
      }

      // Create the offer request
      const duffel = getDuffelClient();
      const offerRequest = await duffel.offerRequests.create({
        slices,
        passengers,
        cabin_class: params.cabinClass || 'economy',
        return_offers: true, // We want the offers immediately
      });

      return offerRequest.data;
    } catch (error) {
      console.error('Error searching flights with Duffel:', error);
      throw error;
    }
  }
}

export const duffelApi = new DuffelClient();
