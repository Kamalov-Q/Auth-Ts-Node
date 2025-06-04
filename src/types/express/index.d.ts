import { JwtPayload } from "jsonwebtoken";
import { User } from "../types";

export interface JwtUserPayload {
  id: string; // or id: string, depending on your token
  name: string;
  password: string;
  email: string;
  role?: string;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      user: JwtUserPayload;
    }
  }
}
