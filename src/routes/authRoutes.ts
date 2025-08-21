import { Router, Request, Response } from "express";
import {
  signUpController,
  loginController,
} from "../controllers/authController";

const router = Router();

router.post("/sign-up", signUpController);
router.post("/login", loginController);

export default router;
