import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export enum Role {
  USER = "user",
  ADMIN = "admin",
}

export type User = {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  role?: Role;
};

export const UsersSchema = new mongoose.Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.USER },
  },
  { timestamps: true }
);

export const User =
  mongoose.models.Users ||
  mongoose.model("Users", new mongoose.Schema<User>({}));
