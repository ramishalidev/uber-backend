import { Router } from "express";
import homeRoutes from "./homeRoutes";
import userRoutes from "./authRoutes";

const router = Router();

router.use("/", homeRoutes);
router.use("/users", userRoutes);
export default router;
