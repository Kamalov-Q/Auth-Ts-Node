import { Response, Request, NextFunction, RequestHandler } from "express";
import { Role, User as UserType } from "../types/types";
export const authorizeUser = (roles: Role[] = []): RequestHandler => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = req.user;
      console.log(user, "user from middleware");
      if (!roles.includes((user as UserType).role as Role)) {
        res.status(403).json({ message: "Access Denied" });
        return;
      }

      next();
    } catch (error) {
      console.error(`Error while authorizing user: ${error}`);
      res.status(500).json({ message: `Internal Server Error : ${error}` });
    }
  };
};
