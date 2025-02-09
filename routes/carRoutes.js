import express from "express";
import upload from "../middleware/UploadDisk.js";
import { createCar, deleteCar, getAllCars, getCarByUUID } from "../controllers/CarController.js";

const router = express.Router();

router.get("/get-all-cars", getAllCars)
router.get("/get-car/:uuid", getCarByUUID);
router.post("/create-car", upload.single("uploads"), createCar);
router.delete("/delete-car/:id", deleteCar);

export default router;
