import { throwError } from "../../../utils/Error/errorHelper.js";
import ListingModel from "../../../models/Listing/index.js";
const createListing = async (req, res, next) => {
  let {
    listing_item_title,
    listing_item_description,
    listing_item_quantity,
    listing_item_categories,
    listing_item_portion_size,
    listing_item_portion_unit,
    listing_item_expiry_time,
    listing_item_pickup_time,
    listing_item_status,
    listing_item_image_url,
  } = req.body;
  const { id } = req.user;

  try {
    if (
      !listing_item_title ||
      !listing_item_description ||
      !listing_item_quantity ||
      !listing_item_categories ||
      !listing_item_portion_size ||
      !listing_item_portion_unit ||
      !listing_item_expiry_time ||
      !listing_item_pickup_time
    ) {
      throwError("MISSING_FIELDS", "Please fill all the fields", 400);
    }
    if (!id) {
      throwError("INVALID_RESTAURANT", "Invalid restaurant id", 400);
    }
    listing_item_categories = listing_item_categories.split(",").map((cat) => {
      return cat.trim();
    });
    const newListing = new ListingModel(req.body);
    newListing.listing_item_quantity = parseInt(listing_item_quantity);
    console.log(typeof newListing.listing_item_quantity);
    newListing.listing_item_portion_size = parseInt(listing_item_portion_size);
    newListing.listing_item_expiry_time = new Date(listing_item_expiry_time);
    newListing.listing_item_pickup_time = new Date(listing_item_pickup_time);

    newListing.listing_item_restaurant_id = id;
    const listing = await newListing.save();
    if (!listing) {
      throwError("INTERNAL_SERVER_ERROR", "Error while adding listing", 500);
    }
    res.status(201).json({
      success: true,
      data: listing,
      message: "Listing added successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getListings = async (req, res, next) => {
  const { id } = req.user;

  try {
    if (!id) {
      throwError("INVALID_RESTAURANT", "Invalid restaurant id", 400);
    }

    const listing = await ListingModel.find({
      listing_item_restaurant_id: id,
    });
    if (!listing) {
      throwError("NO_LISTINGS", "No Listings Found", 201);
    }

    res.status(200).json({
      success: true,
      data: listing,
      message: "Listing fetched successfully",
    });
  } catch (error) {
    error.message = "Error while fetching listings";
    error.status = 500;
    error.code = "INTERNAL_SERVER_ERROR";
    next(error);
  }
};

const getListingById = async (req, res) => {
  const { id } = req.user;
  const { listing_id } = req.params;
  try {
    if (!id) {
      throwError("INVALID_RESTAURANT", "Invalid restaurant id", 400);
    }

    const listing = await ListingModel.find({
      _id: listing_id,
    });
    if (!listing) {
      throwError("NO_LISTINGS", "No Listings Found", 201);
    }
    console.log(listing);
    res.status(200).json({
      success: true,
      data: listing,
      message: "Listing fetched successfully",
    });
  } catch (error) {
    error.message = "Error while fetching listings";
    error.status = 500;
    error.code = "INTERNAL_SERVER_ERROR";
    next(error);
  }
};
export { createListing, getListings, getListingById };
