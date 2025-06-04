import { Request, Response } from "express";
import { User } from "../../models/users.model";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateToken";
import { comparePassword, hashPassword } from "../../utils/hash";
export const registerUser = async (
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

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
    return;
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(422).json({ message: "All fields are required" });
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
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const accessToken = generateAccessToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);

    res.status(200).json({
      message: "User logged in successfully",
      user: existingUser,
      accessToken,
      refreshToken,
    });
    return;
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error : ${error}` });
    return;
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(user, "user");
    res.status(200).json({ user, message: "Current User" });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error : ${error}` });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users, message: "Users", count: users.length });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error : ${error}` });
  }
};
