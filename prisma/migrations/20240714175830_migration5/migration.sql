/*
  Warnings:

  - You are about to drop the column `timeTableId` on the `week` table. All the data in the column will be lost.
  - Added the required column `timesheetId` to the `week` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `week` DROP FOREIGN KEY `week_ibfk_1`;

-- AlterTable
ALTER TABLE `week` DROP COLUMN `timeTableId`,
    ADD COLUMN `timesheetId` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `timesheetId` ON `week`(`timesheetId`);

-- AddForeignKey
ALTER TABLE `week` ADD CONSTRAINT `week_ibfk_1` FOREIGN KEY (`timesheetId`) REFERENCES `timesheet`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
