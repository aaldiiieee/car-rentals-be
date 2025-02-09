-- CreateTable
CREATE TABLE `mcr_testimonials` (
    `mt_id` INTEGER NOT NULL AUTO_INCREMENT,
    `mt_user_uuid` VARCHAR(191) NOT NULL,
    `mt_rating` INTEGER NOT NULL DEFAULT 0,
    `mt_comment` VARCHAR(191) NOT NULL,
    `mt_createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `mt_updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`mt_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `mcr_testimonials` ADD CONSTRAINT `mcr_testimonials_mt_user_uuid_fkey` FOREIGN KEY (`mt_user_uuid`) REFERENCES `mcr_users`(`mu_uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
