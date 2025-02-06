import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (filePath) => {
  try {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      filePath,
      {
        folder: "car-rentals",
      }
    );
    return { secure_url, public_id };
  } catch (error) {
    console.log("Error dalam uploadImage:", error);
    throw error;
  }
};

export const deleteImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log("Error dalam deleteImage:", error);
    throw error;
  }
};
