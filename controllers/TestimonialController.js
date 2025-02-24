import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await prisma.mcr_testimonials.findMany({
      include: {
        mcr_users: {
          select: {
            mu_full_name: true,
            mu_email: true,
            mu_image_url: true,
          },
        },
      },
    });

    if (!testimonials) {
      return res.status(404).json({
        message: "Data testimonials tidak ditemukan.",
        success: false,
        status: 404,
      });
    }

    const formattedTestimonials = testimonials.map((testimonial) => ({
      mt_id: testimonial.mt_id,
      mt_rating: testimonial.mt_rating,
      mt_comment: testimonial.mt_comment,
      mt_createdAt: testimonial.mt_createdAt,
      mt_updatedAt: testimonial.mt_updatedAt,
      mt_show_comment: testimonial.mt_show_comment,
      user: {
        mu_full_name: testimonial.mcr_users.mu_full_name,
        mu_email: testimonial.mcr_users.mu_email,
        mu_image_url: testimonial.mcr_users.mu_image_url,
      },
    }));

    res.status(200).json({
      message: "Data testimonials berhasil diambil.",
      success: true,
      status: 200,
      data: formattedTestimonials,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      status: 500,
    });
  }
};

export const addTestimonial = async (req, res) => {
  try {
    const { mt_rating, mt_comment, mt_user_uuid } = req.body;

    if (!mt_user_uuid) {
      return res.status(400).json({
        message: "User UUID diperlukan.",
        success: false,
        status: 400,
      });
    }

    const user = await prisma.mcr_users.findUnique({
      where: {
        mu_uuid: mt_user_uuid,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan.",
        success: false,
        status: 404,
      });
    }

    const testimonial = await prisma.mcr_testimonials.create({
      data: {
        mt_rating,
        mt_comment,
        mt_user_uuid,
      },
    });

    res.status(200).json({
      message: "Testimonial berhasil ditambahkan.",
      success: true,
      status: 200,
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      status: 500,
    });
  }
};

export const toggleTestimonialComment = async (req, res) => {
  try {
    // Validasi ID
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        message: "ID tidak valid.",
        success: false,
        status: 400,
      });
    }

    // Ambil data testimonial berdasarkan ID
    const testimonial = await prisma.mcr_testimonials.findUnique({
      where: { mt_id: id },
    });

    // Jika data tidak ditemukan
    if (!testimonial) {
      return res.status(404).json({
        message: "Data tidak ditemukan.",
        success: false,
        status: 404,
      });
    }

    // Toggle nilai mt_show_comment
    const updatedTestimonial = await prisma.mcr_testimonials.update({
      where: { mt_id: id },
      data: {
        mt_show_comment: !testimonial.mt_show_comment, // Balik nilai
        mt_updatedAt: new Date(),
      },
    });

    // Berhasil mengupdate data
    res.status(200).json({
      message: "Data berhasil diupdate.",
      success: true,
      status: 200,
      data: updatedTestimonial,
    });
  } catch (error) {
    // Error Prisma (contoh: ID tidak ditemukan)
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Data tidak ditemukan.",
        success: false,
        status: 404,
      });
    }

    // Error lainnya
    res.status(500).json({
      message: error.message || "Terjadi kesalahan pada server.",
      success: false,
      status: 500,
    });
  }
};
