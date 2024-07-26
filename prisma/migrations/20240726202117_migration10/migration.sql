/*
  Warnings:

  - You are about to drop the column `createdAt` on the `refreshtoken` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `refreshtoken` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `refreshtoken` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `refreshtoken` DROP FOREIGN KEY `refreshToken_ibfk_1`;

-- AlterTable
ALTER TABLE `refreshtoken` DROP COLUMN `createdAt`,
    DROP COLUMN `userId`,
    ADD COLUMN `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `user_id` INTEGER NOT NULL,
    MODIFY `token` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE INDEX `user_id` ON `refreshtoken`(`user_id`);

-- AddForeignKey
ALTER TABLE `refreshtoken` ADD CONSTRAINT `refreshtoken_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- RenameIndex
ALTER TABLE `refreshtoken` RENAME INDEX `RefreshToken_token_key` TO `token`;
