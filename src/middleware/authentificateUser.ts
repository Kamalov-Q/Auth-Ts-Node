import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { config } from "dotenv";
import { JwtUserPayload } from "../types/express";

config();

export const authentificateUser: RequestHandler = (
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
      return;
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

    if (!decodedToken) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    req.user = decodedToken as JwtUserPayload;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    } else if (error instanceof JsonWebTokenError) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    } else {
      res.status(500).json({ message: `Internal Server Error : ${error}` });
    }
  }
};
