import { Router } from "express";
import {
  createListing,
  getListings,
  getListingById,
} from "../../controllers/Restaurant/Listing/index.js";
import { protect } from "../../middlewares/Auth/index.js";
const listingRouter = Router();

// @desc    Create a new listing
listingRouter.post("/", protect, createListing);
listingRouter.get("/", protect, getListings);
listingRouter.get("/:listing_id", protect, getListingById);
export default listingRouter;
