// server/controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import RestaurantModel from "../../../models/Restaurant/index.js";
import { throwError } from "../../../utils/Error/errorHelper.js";
import mongoose from "mongoose";

export const register = async (req, res, next) => {
  try {
    const { restaurant_name, restaurant_password, restaurant_email } = req.body;
    if (!restaurant_name || !restaurant_password || !restaurant_email)
      throwError("MISSING_FIELDS", "Please fill all the fields", 400);

    const restaurantExist = await RestaurantModel.findOne({
      restaurant_email,
    });

    if (restaurantExist)
      throwError("EMAIL_ALREADY_REGISTERED", "Email already registered");

    const newRestaurant = new RestaurantModel(req.body);
    newRestaurant.restaurant_password = await newRestaurant.hashPassword(
      restaurant_password
    );
    const restaurant = await newRestaurant.save();
    if (!restaurant)
      throwError(
        "INTERNAL_SERVER_ERROR",
        "Error while registering restaurant ",
        500
      );
    const token = jwt.sign(
      {
        id: newRestaurant._id,
        role: newRestaurant.role,
        name: newRestaurant.restaurant_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      token,
      success: true,
      data: { id: restaurant._id, name: restaurant.restaurant_name },
      message: "Restaurant registered successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { restaurant_email, restaurant_password } = req.body;

    if (!restaurant_email || !restaurant_password) {
      throwError("MISSING_FIELDS", "Please fill all the fields", 400);
    }

    const user = await RestaurantModel.findOne({ restaurant_email });
    if (!user) {
      throwError("USER_NOT_FOUND", "User not found", 404);
    }
    const isMatch = await user.comparePassword(restaurant_password);
    if (!isMatch) {
      throwError("INVALID_CREDENTIALS", "Invalid credentials", 401);
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.restaurant_name },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.restaurant_name,
        email: restaurant_email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};
