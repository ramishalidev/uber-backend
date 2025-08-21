import { Router } from "express";
import homeRoutes from "./homeRoutes";
import authRoutes from "./authRoutes";

const router = Router();

router.use("/", homeRoutes);
router.use("/auth", authRoutes);

export default router;
