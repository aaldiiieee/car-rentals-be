/*
  Warnings:

  - Added the required column `mcp_image_public_id` to the `mcr_car_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mcr_car_products` ADD COLUMN `mcp_image_public_id` VARCHAR(191) NOT NULL;
