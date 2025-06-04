import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { User } from "../types/types";

config();

export const generateAccessToken = (user: User) => {
  try {
    const accessToken = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: "1h",
      }
    );

    return accessToken;
  } catch (error) {
    console.error(`Error while generating access token: ${error}`);
  }
};

export const generateRefreshToken = (user: User) => {
  try {
    const refreshToken = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    return refreshToken;
  } catch (error) {
    console.error(`Error while generating refresh token: ${error}`);
  }
};
