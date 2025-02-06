-- CreateTable
CREATE TABLE `mcr_car_products` (
    `mcp_id` INTEGER NOT NULL AUTO_INCREMENT,
    `mcp_uuid` VARCHAR(191) NOT NULL,
    `mcp_plate` VARCHAR(191) NOT NULL,
    `mcp_manufacture` VARCHAR(191) NOT NULL,
    `mcp_model` VARCHAR(191) NOT NULL,
    `mcp_image_url` VARCHAR(191) NOT NULL,
    `mcp_rent_type` VARCHAR(191) NOT NULL,
    `mcp_rent_per_day` INTEGER NOT NULL,
    `mcp_capacity` INTEGER NOT NULL,
    `mcp_description` VARCHAR(191) NOT NULL,
    `mcp_transmission` VARCHAR(191) NOT NULL,
    `mcp_available` BOOLEAN NOT NULL,
    `mcp_year` INTEGER NOT NULL,
    `mcp_createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `mcp_updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `mcr_car_products_mcp_uuid_key`(`mcp_uuid`),
    PRIMARY KEY (`mcp_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mcr_users` (
    `mu_id` INTEGER NOT NULL AUTO_INCREMENT,
    `mu_uuid` VARCHAR(191) NOT NULL,
    `mu_phone_number` VARCHAR(191) NOT NULL,
    `mu_email` VARCHAR(191) NOT NULL,
    `mu_password` VARCHAR(191) NOT NULL,
    `mu_address` VARCHAR(191) NOT NULL,
    `mu_province` VARCHAR(191) NOT NULL,
    `mu_city` VARCHAR(191) NOT NULL,
    `mu_district` VARCHAR(191) NOT NULL,
    `mu_full_name` VARCHAR(191) NOT NULL,
    `mu_image_url` VARCHAR(191) NULL,
    `mu_image_public_id` VARCHAR(191) NULL,
    `mu_createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `mu_updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `mcr_users_mu_uuid_key`(`mu_uuid`),
    PRIMARY KEY (`mu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
