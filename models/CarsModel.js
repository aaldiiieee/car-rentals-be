import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CarsModel {
  static async getAllCars() {
    return await prisma.mcr_car_products.findMany();
  }

  static async getCarByPlate(plate) {
    return await prisma.mcr_car_products.findFirst({
      where: {
        mcp_plate: plate
      }
    });
  }

  static async getCarById(id) {
    return await prisma.mcr_car_products.findUnique({
      where: {
        mcp_id: parseInt(id)
      }
    });
  }

  static async createCar(data) {
    return await prisma.mcr_car_products.create({
      data: {
        ...data,
        mcp_rent_per_day: parseInt(data.mcp_rent_per_day),
        mcp_capacity: parseInt(data.mcp_capacity),
        mcp_year: parseInt(data.mcp_year)
      }
    });
  }

  static async deleteCar(id) {
    return await prisma.mcr_car_products.delete({
      where: {
        mcp_id: parseInt(id)
      }
    });
  }
}

export default CarsModel;