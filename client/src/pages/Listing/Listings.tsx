import { useState } from "react";
import { Listing as ListingItem } from "../../lib/types";

import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import ListingCard from "@/components/ListingCard";
import { useUserAuth } from "@/pages/store/authContext";

export default function Listings() {
  const { getUser } = useUserAuth();
  const navigate = useNavigate();
  const data = useLoaderData();
  const [listings, setListings] = useState<ListingItem[] | null>(data);

  if (!listings) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-xl font-semibold text-gray-500">Loading...</p>
      </div>
    );
  }
  if (listings.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-xl font-semibold text-gray-500 mr-5">
          No Listings to show
        </p>
        <button
          onClick={() => navigate("/restaurants/listings/create")}
          className="px-4 py-2 text-white bg-amber-600 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          Create New Listing
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Listings</h1>
        <button
          onClick={() => navigate("/restaurants/listings/create")}
          className="px-4 py-2 text-white bg-amber-600 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          Create New Listing
        </button>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
