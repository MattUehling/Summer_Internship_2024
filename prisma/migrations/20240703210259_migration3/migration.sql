/*
  Warnings:

  - Added the required column `email` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `employee` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `employee_ibfk_1`;

-- AlterTable
ALTER TABLE `employee` ADD COLUMN `email` VARCHAR(255) NOT NULL,
    ADD COLUMN `job` VARCHAR(255) NOT NULL,
    ADD COLUMN `name` VARCHAR(255) NOT NULL,
    MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `name` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
