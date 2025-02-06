/*
  Warnings:

  - You are about to alter the column `mcp_available` on the `mcr_car_products` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `mcr_car_products` MODIFY `mcp_available` VARCHAR(191) NOT NULL;
