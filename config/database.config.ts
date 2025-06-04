import { MongoClient } from "mongodb";
import { config } from "dotenv";
import mongoose from "mongoose";
import { User } from "../models/users.model";
import { hashPassword } from "../utils/hash";
import { Role } from "../types/types";

config();

export async function connectDB() {
  try {
    const MONGODB_URL = process.env.DATABASE_URL!;
    await mongoose.connect(MONGODB_URL);
    console.log("MongoDB connected");

    const existingAdmin = await User.findOne({ email: "kamalov@gmail.com" });

    if (existingAdmin) {
      console.log("Admin already exists!");
    } else {
      const hashedPassword = await hashPassword("test");
      const adminUser = new User({
        name: "Admin",
        email: "kamalov@gmail.com",
        password: hashedPassword,
        role: Role.ADMIN,
      });

      await adminUser.save();
      console.log("Admin user created!");
      console.log(`Seeding completed`);
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
    console.log(`Seeding failed`);
  }
}
