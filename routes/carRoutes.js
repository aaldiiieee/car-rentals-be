import express from "express";
import upload from "../middleware/UploadDisk.js";
import { createCar, deleteCar, getAllCars, getCarByUUID } from "../controllers/CarController.js";
import { apiKey } from "../middleware/apiKey.js";

const router = express.Router();

router.use(apiKey);

router.get("/get-all-cars", getAllCars)
router.get("/get-car/:uuid", getCarByUUID);
router.post("/create-car", upload.single("uploads"), createCar);
router.delete("/delete-car/:uuid", deleteCar);

export default router;
