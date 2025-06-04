import { RequestHandler, Router } from "express";
import {
  getCurrentUser,
  getUsers,
  loginUser,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/auth/register.controller";
import { authentificateUser } from "../middleware/authentificateUser";
import { Role } from "../types/types";
import { authorizeUser } from "../middleware/authorizeUser";
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current-user", authentificateUser, getCurrentUser);
router.get(
  "/users",
  authentificateUser,
  authorizeUser(["admin" as Role]),
  getUsers
);

router.put(
  "/user-profile/:id",
  authentificateUser,
  authorizeUser(["admin" as Role]),
  updateUserProfile
);

router.patch(
  "/user/:userId",
  authentificateUser,
  authorizeUser(["admin" as Role]),
  updateUser
);

export default router;
