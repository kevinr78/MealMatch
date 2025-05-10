import { Listing } from "@/lib/types";
import { useNavigate } from "react-router-dom";
type ListingCardProps = {
  listing: Listing;
};

export default function ListingCard({ listing }: ListingCardProps) {
  const pickUpDate = new Date(listing.listing_item_pickup_time);
  const expiryDate = new Date(listing.listing_item_expiry_time);
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const pickUpDateformattedTime = pickUpDate.toLocaleString(
    "en-US",
    timeOptions
  );
  const pickUpDateformattedDate = pickUpDate.toLocaleDateString(
    "en-US",
    dateOptions
  );
  const expiryDateformattedTime = expiryDate.toLocaleString(
    "en-US",
    timeOptions
  );
  const expiryDateformattedDate = expiryDate.toLocaleDateString(
    "en-US",
    dateOptions
  );
  const navigate = useNavigate();
  return (
    <div
      className="card bg-base-100 w-72 shadow-sm hover:scale-110  transition-all"
      key={listing._id}
    >
      <figure className="h-48 w-full overflow-hidden">
        <img
          src={
            listing.listing_item_image_url ??
            "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          }
          alt="Listing Item"
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {listing.listing_item_title}
          <div className="badge badge-outline">
            {listing.listing_item_status}
          </div>
        </h2>
        <p>{listing.listing_item_description}</p>
        <div className=" flex justify-between">
          <p>
            Portion Size: {listing.listing_item_portion_size}{" "}
            {listing.listing_item_portion_unit}
          </p>
          <p>Quantity: {listing.listing_item_quantity}</p>
        </div>
        <div className=" flex flex-col justify-between">
          <p>
            Pickup Time:{" "}
            {`${pickUpDateformattedDate} ${pickUpDateformattedTime}`}{" "}
          </p>
          <p>
            Expiry Time:{" "}
            {`${expiryDateformattedDate} ${expiryDateformattedTime}`}{" "}
          </p>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Claim</button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate(`/restaurants/listing/${listing._id}`)}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}
