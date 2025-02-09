import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllWhyUs = async (req, res) => {
  try {
    const whyUsData = await prisma.mcr_why_us.findMany();

    if (!whyUsData) {
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
      data: whyUsData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      status: 500,
    });
  }
};

export const addWhyUs = async (req, res) => {
  try {
    const { mwu_title, mwu_description, mwu_icon_url } = req.body;

    const whyUs = await prisma.mcr_why_us.create({
      data: {
        mwu_title,
        mwu_description,
        mwu_icon_url,
      },
    });

    res.status(200).json({
      message: "Data berhasil ditambahkan",
      success: true,
      status: 200,
      data: whyUs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      status: 500,
    });
  }
};
