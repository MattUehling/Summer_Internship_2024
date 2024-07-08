/*
  Warnings:

  - You are about to drop the `timetable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `timetable` DROP FOREIGN KEY `timetable_ibfk_1`;

-- DropForeignKey
ALTER TABLE `week` DROP FOREIGN KEY `week_ibfk_1`;

-- AlterTable
ALTER TABLE `week` ADD COLUMN `endDate` VARCHAR(255) NULL,
    ADD COLUMN `hoursWorked` INTEGER NULL,
    ADD COLUMN `startDate` VARCHAR(255) NULL,
    ADD COLUMN `submissionDate` VARCHAR(255) NULL;

-- DropTable
DROP TABLE `timetable`;

-- CreateTable
CREATE TABLE `timesheet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` INTEGER NOT NULL,

    INDEX `employeeId`(`employeeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `week` ADD CONSTRAINT `week_ibfk_1` FOREIGN KEY (`timeTableId`) REFERENCES `timesheet`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `timesheet` ADD CONSTRAINT `timesheet_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `employee`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
