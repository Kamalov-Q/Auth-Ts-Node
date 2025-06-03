import { Router, Request, Response } from "express";
import register from "../controllers/auth/register.controller";
import { authentificateUser } from "../../middleware/authentificateUser";
const router = Router();

router.post("/register", register);

export default router;
