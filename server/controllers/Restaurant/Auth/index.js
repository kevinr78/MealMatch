// server/controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Restaurant from "../../../models/Restaurant/index.js";
import { throwError } from "../../../utils/Error/errorHelper.js";
import mongoose from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  try {
    const {
      restaurant_name,
      restaurant_address,
      restaurant_location,
      restaurant_contact,
      restaurant_city,
      restaurant_state,
      restaurant_zip_code,
      restaurant_contact_person,
      restaurant_cuisine,
      password,
      restaurant_email,
    } = req.body;
    const restaurantExist = await Restaurant.findOne({
      restaurant_email,
    });

    if (restaurantExist)
      throwError("EMAIL_ALREADY_REGISTERED", "Email already registered");

    const hashedPassword = await Restaurant.hashPassword(password);
    const newRestaurant = await new mongoose.model("Restaurant")(req.body);
    const restaurant = await newRestaurant.save();
    if (!restaurant)
      throwError(
        "INTERNAL_SERVER_ERROR",
        "Error while registering restaurant ",
        500
      );

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .status(201)
      .json({
        token,
        success: true,
        message: "Restaurant registered successfully",
      });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      user: { id: user._id, name: user.name, email, role: user.role },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
