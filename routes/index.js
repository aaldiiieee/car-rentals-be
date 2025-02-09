import express from "express";

import carRoutes from "./carRoutes.js";
import authRoutes from "./authRoutes.js";
import whyUsRoutes from "./whyUsRoutes.js";
import testimonialRoutes from "./testimonialRoutes.js";

const router = express.Router();

router.use("/cars", carRoutes);
router.use("/auth", authRoutes);
router.use("/why-us", whyUsRoutes);
router.use("/testimonials", testimonialRoutes);

export default router;