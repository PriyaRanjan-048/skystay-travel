import { duffelApi } from "@/lib/duffel";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  try {
    const suggestions = await duffelApi.searchLocations(query);
    return NextResponse.json(suggestions);
  } catch (error: any) {
    console.error("Duffel Suggestions API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch suggestions" }, { status: 500 });
  }
}
