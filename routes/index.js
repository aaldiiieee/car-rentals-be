import express from "express";

import carRoutes from "./carRoutes.js";
import authRoutes from "./authRoutes.js";

const router = express.Router();

router.use("/cars", carRoutes);
router.use("/auth", authRoutes);

export default router;