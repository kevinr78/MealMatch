// server/config/db.js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let db;

export const connectDB = async () => {
  try {
    await client.connect();
    db = client.db("MealMatch").command({ ping: 1 }); // You can also pass a DB name: client.db("your-db-name")
    console.log("✅ MongoDB connected ");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error("DB not initialized. Call connectDB first.");
  }
  return db;
};
