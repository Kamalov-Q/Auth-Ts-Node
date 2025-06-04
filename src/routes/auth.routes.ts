import { Router } from "express";
import {
  getCurrentUser,
  getUsers,
  loginUser,
  registerUser,
} from "../controllers/auth/register.controller";
import { authentificateUser } from "../../middleware/authentificateUser";
import { authorizeUser } from "../../middleware/authorizeUser";
import { Role } from "../../types/types";
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

export default router;
