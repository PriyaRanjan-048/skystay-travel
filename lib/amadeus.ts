import axios from 'axios';

// Sky-Scrapper API credentials from environment variables
const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '';
const RAPIDAPI_HOST = process.env.NEXT_PUBLIC_RAPIDAPI_HOST || 'sky-scrapper.p.rapidapi.com';
const BASE_URL = `https://${RAPIDAPI_HOST}/api`;

class SkyScrapperApi {
  /**
   * Make a request to the Sky-Scrapper API
   */
  private async makeRequest(version: string, endpoint: string, params: any = {}): Promise<any> {
    try {
      if (!RAPIDAPI_KEY || RAPIDAPI_KEY === 'your_rapidapi_key_here') {
        console.warn('RapidAPI Key is missing or default. API calls will fail.');
      }

      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/${version}/${endpoint}`,
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': RAPIDAPI_HOST,
        },
        params,
      });
      
      return response.data;
    } catch (error: any) {
      const apiMessage = error?.response?.data?.message || error.message || "";
      if (apiMessage) {
        error.message = apiMessage;
      }
      console.error(`Error making Sky-Scrapper API request to ${endpoint}:`, error?.response?.data || error);
      throw error;
    }
  }

  /**
   * Search for flights using the Sky-Scrapper v2 searchFlightsWebComplete API
   * This reproduces public data from Skyscanner in real-time.
   */
  async searchFlights(params: {
    originSkyId: string;
    destinationSkyId: string;
    originEntityId: string;
    destinationEntityId: string;
    date: string;
    returnDate?: string;
    adults?: number;
    children?: number;
    infants?: number;
    cabinClass?: 'economy' | 'premium_economy' | 'business' | 'first';
    sortBy?: 'best' | 'price_low' | 'duration_shortest' | 'outbound_departure_time';
    currency?: string;
    market?: string;
    countryCode?: string;
  }) {
    try {
      // Sky-Scrapper v2 endpoint for comprehensive search
      const queryParams: any = {
        originSkyId: params.originSkyId,
        destinationSkyId: params.destinationSkyId,
        originEntityId: params.originEntityId,
        destinationEntityId: params.destinationEntityId,
        date: params.date,
        adults: params.adults || 1,
        cabinClass: params.cabinClass || 'economy',
        sortBy: params.sortBy || 'best',
        currency: params.currency || 'USD',
        market: params.market || 'en-US',
        countryCode: params.countryCode || 'US'
      };

      if (params.returnDate) {
        queryParams.returnDate = params.returnDate;
      }

      if (params.children) queryParams.children = params.children;
      if (params.infants) queryParams.infants = params.infants;

      return await this.makeRequest('v2', 'flights/searchFlightsComplete', queryParams);
    } catch (error: any) {
      console.error('Error searching flights with Sky-Scrapper:', error);
      throw error;
    }
  }

  /**
   * Search for locations (airports/cities) to get SkyId and EntityId
   */
  async searchLocations(query: string) {
    try {
      console.log(`Searching Sky-Scrapper locations with query: ${query}`);
      return await this.makeRequest('v1', 'flights/searchAirport', { query });
    } catch (error: any) {
      console.error('Error searching locations with Sky-Scrapper:', error);
      throw error;
    }
  }

  /**
   * Placeholder for hotel search (Sky-Scrapper also supports hotels)
   */
  async searchHotels(params: any) {
    console.warn('Hotel search not yet implemented for Sky-Scrapper');
    return { data: [] };
  }
}

// Export as amadeusApi to maintain compatibility with existing imports
// but it now uses Sky-Scrapper under the hood.
export const amadeusApi = new SkyScrapperApi();
