import express from "express";
import upload from "../middleware/UploadDisk.js";
import { createCar, deleteCar, getAllCars } from "../controllers/CarController.js";

const router = express.Router();

router.get("/get-all-cars", getAllCars)
router.post("/create-car", upload.single("uploads"), createCar);
router.delete("/delete-car/:id", deleteCar);

export default router;
