import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const restaurantSchema = new mongoose.Schema(
  {
    restaurant_name: {
      type: String,
      required: true,
    },
    restaurant_address: { type: String, required: true },
    restaurant_location: { type: String, required: true },
    restaurant_contact: { type: Number, required: true },
    restaurant_city: { type: String, required: true },
    restaurant_state: { type: String, required: true },
    restaurant_zip_code: { type: Number, required: true },
    restaurant_contact_person: { type: String, required: true },
    restaurant_cuisine: { type: String },
    is_accepting_orders: { type: Boolean, default: false },
    max_listings_per_ngo_per_day: { type: Number, default: 3 },
    pickup_lead_time_minutes: { type: Number, default: 30 },
    is_first_login: { type: Boolean, default: true },
    requires_manual_confirmation: { type: Boolean, default: false },
    password: { type: String, required: true },
    restaurant_email: { type: String, required: true, unique: true },
    default_pickup_windows: { type: Array },
    restaurant_image: { type: String },
    role: { type: String, default: "restaurant" },
  },
  { timestamps: true }
);
restaurantSchema.index({ restaurant_name: "text" });
restaurantSchema.index({ restaurant_location: "text" });

restaurantSchema.methods.hashPassword = async function (password) {
  return bcrypt.hash(this.password, await bcrypt.genSalt(10));
};
restaurantSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("Restaurant", restaurantSchema);
