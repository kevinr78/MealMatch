// server/controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import OrganizationModel from "../../../models/Organization/index.js";
import { throwError } from "../../../utils/Error/errorHelper.js";

export const register = async (req, res, next) => {
  try {
    const { org_name, org_password, org_email } = req.body;
    if (!org_name || !org_password || !org_email)
      throwError("MISSING_FIELDS", "Please fill all the fields", 400);

    const orgExist = await OrganizationModel.findOne({
      org_email,
    });

    if (orgExist)
      throwError("EMAIL_ALREADY_REGISTERED", "Email already registered");

    const newOrganization = new OrganizationModel(req.body);
    newOrganization.org_password = await newOrganization.hashPassword(
      org_password
    );
    const organization = await newOrganization.save();
    if (!organization)
      throwError(
        "INTERNAL_SERVER_ERROR",
        "Error while registering restaurant ",
        500
      );
    const token = jwt.sign(
      {
        id: organization._id,
        role: organization.role,
        name: organization.org_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      token,
      success: true,
      data: null,
      message: "Organization registered successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { org_email, org_password } = req.body;

    if (!org_email || !org_password) {
      throwError("MISSING_FIELDS", "Please fill all the fields", 400);
    }

    const user = await OrganizationModel.findOne({ org_email });
    if (!user) {
      throwError("USER_NOT_FOUND", "User not found", 404);
    }
    const isMatch = await user.comparePassword(org_password);
    if (!isMatch) {
      throwError("INVALID_CREDENTIALS", "Invalid credentials", 401);
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.org_name },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.org_name,
        email: org_email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};
