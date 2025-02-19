-- CreateTable
CREATE TABLE `mcr_user_bo` (
    `mub_id` INTEGER NOT NULL AUTO_INCREMENT,
    `mub_uuid` VARCHAR(191) NOT NULL,
    `mub_phone_number` VARCHAR(191) NOT NULL,
    `mub_email` VARCHAR(191) NOT NULL,
    `mub_password` VARCHAR(191) NOT NULL,
    `mub_full_name` VARCHAR(191) NOT NULL,
    `mub_image_url` VARCHAR(191) NOT NULL,
    `mub_image_public_id` VARCHAR(191) NOT NULL,
    `mub_role` VARCHAR(191) NOT NULL,
    `mub_createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `mub_updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `mcr_user_bo_mub_uuid_key`(`mub_uuid`),
    PRIMARY KEY (`mub_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
