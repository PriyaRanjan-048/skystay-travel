import { duffelApi } from "@/lib/duffel";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const origin = searchParams.get("from");
  const destination = searchParams.get("to");
  const departureDate = searchParams.get("departure");
  const returnDate = searchParams.get("return");
  const adults = parseInt(searchParams.get("travelers") || "1");

  if (!origin || !destination || !departureDate) {
    return NextResponse.json({ error: "Missing required search parameters" }, { status: 400 });
  }

  try {
    const flightOffers = await duffelApi.searchFlights({
      origin,
      destination,
      departureDate,
      returnDate: returnDate || undefined,
      adults,
    });
    
    return NextResponse.json(flightOffers);
  } catch (error: any) {
    console.error("Duffel Flight Search API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch flight offers" }, { status: 500 });
  }
}
