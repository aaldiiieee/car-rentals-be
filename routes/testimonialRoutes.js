import express from "express";
import { addTestimonial, getAllTestimonials } from "../controllers/TestimonialController.js"
import { authenticateToken } from "../middleware/authenticate.js";
import { apiKey } from "../middleware/apiKey.js";

const router = express.Router();

router.use(apiKey);

router.get("/get-all-testimonials", getAllTestimonials);
router.post("/add-testimonial", authenticateToken, addTestimonial);

export default router;
