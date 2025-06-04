import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { JwtUserPayload } from "../types/express";

config();

export const authentificateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

    if (!decodedToken) {
      res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decodedToken as JwtUserPayload;

    next();
  } catch (error) {
    console.error(`Error while authenticating user: ${error}`);
  }
};
