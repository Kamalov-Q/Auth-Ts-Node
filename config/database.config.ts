import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri!);

export async function connectDB() {
  try {
    await client.connect();
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
