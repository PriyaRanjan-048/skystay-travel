import { Suspense } from "react";
import FlightSearchResultsClient from "./FlightSearchResultsClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="pt-36 pb-16 bg-gray-50">
          <div className="container mx-auto px-4">Loading…</div>
        </div>
      }
    >
      <FlightSearchResultsClient />
    </Suspense>
  );
}

