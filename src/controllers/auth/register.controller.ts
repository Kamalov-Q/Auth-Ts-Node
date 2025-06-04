import { Request, RequestHandler, Response } from "express";
import { User } from "../../models/users.model";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateToken";
import { comparePassword, hashPassword } from "../../utils/hash";
import mongoose from "mongoose";

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export const registerUser: RequestHandler<{}, {}, RegisterBody> = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(422).json({ message: "All fields are required" });
      return;
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const { password: removedPassword, ...rest } = newUser.toObject();

    res.status(201).json({
      message: "User registered successfully",
      user: rest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
    return;
  }
};

interface LoginBody {
  email: string;
  password: string;
}

export const loginUser: RequestHandler<{}, {}, LoginBody> = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(422).json({ message: "Email and password are required" });
      return;
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const isPasswordMatch = await comparePassword(
      password,
      existingUser.password
    );

    if (!isPasswordMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const accessToken = generateAccessToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);

    const { password: removedPassword, ...rest } = existingUser.toObject();

    res.status(200).json({
      message: "User logged in successfully",
      user: rest,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

export const getCurrentUser: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ message: "Unauthorized: User ID missing" });
      return;
    }

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ user, message: "Current User" });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
    return;
  }
};

export const getUsers: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users, message: "Users", count: users.length });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

export const updateUserProfile: RequestHandler<
  { id: string },
  {},
  { name: string }
> = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id) || !id) {
      res.status(422).json({ message: "Provide all required fields" });
      return;
    }

    if (!name) {
      res.status(422).json({ message: "Provide all required fields" });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const { password, ...rest } = updatedUser.toObject();

    res.status(200).json({ message: "Profile updated", user: rest });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

interface UpdateUserBody {
  email?: string;
  name?: string;
  password?: string;
}

export const updateUser: RequestHandler<
  { userId: string },
  {},
  UpdateUserBody
> = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name, password } = req.body;
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId) || !userId) {
      res.status(422).json({ message: "Invalid User ID" });
      return;
    }

    const updFields: Partial<UpdateUserBody> = {};

    if (name) updFields.name = name;
    if (email) updFields.email = email;
    if (password) updFields.password = await hashPassword(password);

    if (Object.keys(updFields).length === 0) {
      res.status(422).json({ message: "Provide at least one field to update" });
      return;
    }

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updFields, {
      new: true,
    });

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
    }

    const { password: userPassword, ...rest } = updatedUser.toObject();

    res.status(200).json({ message: "User updated successfully", user: rest });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};
