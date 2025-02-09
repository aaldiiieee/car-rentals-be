-- CreateTable
CREATE TABLE `mcr_our_services` (
    `mos_id` INTEGER NOT NULL AUTO_INCREMENT,
    `mos_title` VARCHAR(191) NOT NULL,
    `mos_description` VARCHAR(191) NOT NULL,
    `mos_benefits` VARCHAR(191) NOT NULL,
    `mos_image_url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`mos_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mcr_why_us` (
    `mwu_id` INTEGER NOT NULL AUTO_INCREMENT,
    `mwu_title` VARCHAR(191) NOT NULL,
    `mwu_description` VARCHAR(191) NOT NULL,
    `mwu_icon_url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`mwu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
