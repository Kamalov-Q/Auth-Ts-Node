import { Response, Request, NextFunction } from "express";
import { Role, User as UserType } from "../types/types";
import { User } from "../models/users.model";
export const authorizeUser = (roles: Role[] = []) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      console.log(user, "user from middleware");
      if (!roles.includes((user as UserType).role as Role)) {
        res.status(403).json({ message: "Access Denied" });
      }

      next();
    } catch (error) {
      console.error(`Error while authorizing user: ${error}`);
      res.status(500).json({ message: `Internal Server Error : ${error}` });
    }
  };
};
