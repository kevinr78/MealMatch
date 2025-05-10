import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Listing as ListingItem } from "@/lib/types";
const Listing = () => {
  const listing: ListingItem = useLoaderData();
  const [enabled, setEnabled] = useState(true);
  const [quantity, setQuantity] = useState("");
  const [choice, setChoice] = useState("");
  const [status, setStatus] = useState("Available");
  const [pickupTime, setPickupTime] = useState("");

  const handleUpdate = () => {
    const formData = {
      enabled,
      quantity,
      choice,
      status,
      pickupTime,
    };

    // Mock submission
    console.log("Submitted data:", formData);
    alert("Updated successfully!");
  };
  console.log(listing);
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Container */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="flex-1 space-y-4">
          {/* Title & Toggle */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {listing.listing_item_title}
            </h2>
            <label className="cursor-pointer label">
              <span className="label-text mr-2">Enable / Disable</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={enabled}
                onChange={() => setEnabled(!enabled)}
              />
            </label>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm">
            {listing.listing_item_description}
          </p>

          {/* Category */}
          <p className="text-sm text-gray-800">
            <strong>Category:</strong> {listing.listing_item_category}
          </p>

          {/* Form Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="form-control w-full">
              <span className="label-text">Quantity</span>
              <input
                type="number"
                placeholder="Enter quantity"
                className="input input-bordered w-full"
                value={listing.listing_item_quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text">Choose</span>
              <select
                className="select select-bordered w-full"
                value={choice}
                onChange={(e) => setChoice(e.target.value)}
              >
                <option disabled value="">
                  Choose option
                </option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </label>

            <label className="form-control w-full">
              <span className="label-text">Status</span>
              <select
                className="select select-bordered w-full"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Available</option>
                <option>Unavailable</option>
              </select>
            </label>

            <label className="form-control w-full">
              <span className="label-text">Pick Up Time</span>
              <input
                type="time"
                className="input input-bordered w-full"
                value={listing.listing_item_pickup_time}
                onChange={(e) => setPickupTime(e.target.value)}
              />
            </label>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="flex-1 flex flex-col items-center">
          <img
            src={listing.listing_item_image_url}
            alt="Preview"
            className="rounded-lg border"
          />
          <button className="btn btn-info mt-3 w-full">Change</button>
        </div>
      </div>

      {/* Update Button */}
      <div className="mt-6 text-right">
        <button onClick={handleUpdate} className="btn btn-primary">
          Update
        </button>
        <p className="text-xs text-gray-500 mt-2">
          Created At: Sat May 10 2025 19:08:48
        </p>
      </div>
    </div>
  );
};

export default Listing;
