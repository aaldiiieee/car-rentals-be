import express from "express";
import { addWhyUs, getAllWhyUs } from "../controllers/WhyUsController.js";

const router = express.Router();

router.get("/get-all-why-us", getAllWhyUs);
router.post("/add-why-us", addWhyUs);

export default router;
