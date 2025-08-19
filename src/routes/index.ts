import { Router } from "express";
import homeRoutes from "./homeRoutes";

const router = Router();

router.use("/", homeRoutes);

export default router;
