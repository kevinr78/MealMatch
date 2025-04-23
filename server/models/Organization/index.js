import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const organizationSchema = new mongoose.Schema(
  {
    org_name: {
      type: String,
      required: true,
    },
    org_address: {
      type: String,
      required: true,
    },
    org_location: {
      type: String,
      required: true,
    },
    org_contact_person: {
      type: String,
      required: true,
    },
    org_contact_number: {
      type: Number,
      required: true,
    },
    daily_restaurant_limit: {
      type: Number,
      default: 2,
      required: true,
    },
    total_pickups: {
      type: Number,
      default: 0,
    },
    no_show_count: {
      type: Number,
      default: 0,
    },
    org_email: {
      type: String,
      required: true,
      unique: true,
    },
    org_password: {
      type: String,
      required: true,
    },
    org_city: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "organization",
    },
    org_state: {
      type: String,
      required: true,
    },
    org_zip_code: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
organizationSchema.methods.hashPassword = async function (password) {
  return bcrypt.hashSync(password, await bcrypt.genSalt(10));
};
organizationSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.org_password);
};

export default mongoose.model("Organization", organizationSchema);
