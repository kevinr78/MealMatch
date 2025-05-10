import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    listing_item_title: {
      type: String,
      required: true,
    },
    listing_item_description: {
      type: String,
      required: true,
    },
    listing_item_quantity: {
      type: Number,
      required: true,
    },
    listing_item_category: {
      type: [],
      required: true,
    },
    listing_item_portion_size: {
      type: Number,
      required: true,
    },
    listing_item_portion_unit: {
      type: String,
      required: true,
    },
    listing_item_restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    listing_item_expiry_time: {
      type: Date,
      required: true,
    },
    listing_item_pickup_time: {
      type: Date,
      required: true,
    },
    listing_item_status: {
      type: String,
      default: "active",
      required: true,
    },
    listing_item_image_url: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Listing", listingSchema);
