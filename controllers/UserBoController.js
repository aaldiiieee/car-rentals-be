import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const getAllUsers = async (req, res) => {
  try {
    const usersData = await prisma.mcr_user_bo.findMany();

    if (!usersData) {
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
      data: usersData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      status: 500,
    });
  }
};

export const register = async (req, res) => {
  const { mub_phone_number, mub_email, mub_password, mub_full_name, mub_role } =
    req.body;

  try {
    const existingUser = await prisma.mcr_user_bo.findFirst({
      where: { mub_email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(mub_password, 10);
    const user = await prisma.mcr_user_bo.create({
      data: {
        mub_phone_number,
        mub_email,
        mub_password: hashedPassword,
        mub_full_name,
        mub_role,
      },
    });

    res.status(200).json({
      message: "Data berhasil ditambahkan",
      success: true,
      status: 200,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      status: 500,
    });
  }
};

export const login = async (req, res) => {
  const { mub_email, mub_password } = req.body;

  try {
    const user = await prisma.mcr_user_bo.findFirst({
      where: { mub_email },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        status: 404,
      });
    }

    const isPasswordValid = await bcrypt.compare(mub_password, user.mub_password);
    console.log(isPasswordValid, "< isPasswordValid");
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Password salah.",
        status: 401,
        success: false,
      });
    }

    const token = jwt.sign({ id: user.mub_uuid }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log(token, "< token");

    res.status(200).json({
      message: "Login berhasil",
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
