import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const login = async (req, res) => {
  const { mu_email, mu_password } = req.body;

  try {
    const user = await prisma.mcr_users.findFirst({
      where: { mu_email },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        status: 404,
      });
    }

    if (user.mu_email !== mu_email) {
      return res.status(401).json({
        message: "Invalid email",
        success: false,
        status: 401,
      });
    }

    const isPasswordValid = await bcrypt.compare(mu_password, user.mu_password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Password salah.",
        status: 401,
        success: false,
      });
    }

    const token = jwt.sign({ id: user.mu_uuid }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    if (!token) {
      return res.status(500).json({
        message: "Failed to generate token",
        success: false,
        status: 500,
      });
    }

    res.status(200).json({
      message: "Login successful",
      success: true,
      status: 200,
      data: user,
      token,
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

export const register = async (req, res) => {
  const {
    mu_phone_number,
    mu_email,
    mu_password,
    mu_full_name,
    mu_address,
    mu_province,
    mu_city,
    mu_district,
  } = req.body;

  try {
    const existingUser = await prisma.mcr_users.findFirst({
      where: { mu_email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(mu_password, 10);
    const user = await prisma.mcr_users.create({
      data: {
        mu_phone_number,
        mu_email,
        mu_password: hashedPassword,
        mu_full_name,
        mu_address,
        mu_province,
        mu_city,
        mu_district,
      },
    });

    if (!user) {
      return res.status(500).json({
        message: "Failed to register user",
        success: false,
        status: 500,
      });
    }

    res.status(200).json({
      message: "User registered successfully",
      success: true,
      status: 200,
      data: user,
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
