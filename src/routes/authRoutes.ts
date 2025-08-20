import { Router, Request, Response } from "express";
import { signUpController } from "../controllers/authController";

const router = Router();

router.post("/sign-up", signUpController);

export default router;
