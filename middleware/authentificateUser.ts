import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const authentificateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    console.log(token, "token");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decodedToken;

    next();
  } catch (error) {
    console.error(`Error while authenticating user: ${error}`);
  }
};
