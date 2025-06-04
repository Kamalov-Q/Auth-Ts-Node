import { ObjectId } from "mongoose";

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
