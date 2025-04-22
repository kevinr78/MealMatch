import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import restaurantRouter from "./routes/Restaurant/routes.js";
import { connectDB } from "./config/db/connection.js";
import { globalErrorHandler } from "./utils/Error/errorHelper.js";
import { error } from "console";
dotenv.config();
// MongoDB connection
connectDB();

const __dirname = path.resolve();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/restaurants", restaurantRouter);

app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
