import CarsModel from "../models/CarsModel.js";
import { uploadImage, deleteImage } from "../utils/uploads.js";
import { generateUUIDv4 } from "../utils/generators.js";
import fs from "fs";

export const getAllCars = async (req, res) => {
  try {
    const carsData = await CarsModel.getAllCars();

    if (!carsData) {
      res.status(400).json({
        message: "Tidak ada data",
        success: false,
        status: 400,
      });
    }

    res.status(200).json({
      message: "Data berhasil didapatkan",
      success: true,
      status: 200,
      data: carsData
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      status: 500,
    });
  }
};

export const createCar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "File gambar diperlukan.",
        success: false,
        status: 400,
      });
    }

    const uuid = generateUUIDv4();

    const payload = {
      ...req.body,
      mcp_rent_per_day: parseInt(req.body.mcp_rent_per_day),
      mcp_capacity: parseInt(req.body.mcp_capacity),
      mcp_year: parseInt(req.body.mcp_year),
      mcp_uuid: uuid,
    };

    const existingCar = await CarsModel.getCarByPlate(payload.mcp_plate);
    if (existingCar) {
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        message: "Nomor plat mobil sudah terdaftar",
        success: false,
        status: 400,
      });
    }

    const { secure_url, public_id } = await uploadImage(req.file.path);

    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    const car = await CarsModel.createCar({
      ...payload,
      mcp_image_url: secure_url,
      mcp_image_public_id: public_id,
    });

    res.status(201).json({
      message: "Mobil berhasil ditambahkan",
      success: true,
      status: 201,
      data: car,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({
      message: error.message,
      success: false,
      status: 500,
    });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await CarsModel.getCarById(id);
    if (!car) {
      return res.status(404).json({
        message: "Mobil tidak ditemukan",
        success: false,
        status: 404,
      });
    }

    if (car.mcp_image_public_id) {
      await deleteImage(car.mcp_image_public_id);
    }

    await CarsModel.deleteCar(id);

    res.status(200).json({
      message: "Mobil berhasil dihapus",
      success: true,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      success: false,
      status: 500,
    });
  }
};
