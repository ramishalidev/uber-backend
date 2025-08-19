import { Router } from "express";
import {
  homeController,
  healthController,
} from "../controllers/homeController";

const router = Router();

router.get("/", homeController);
router.get("/health", healthController);

export default router;
