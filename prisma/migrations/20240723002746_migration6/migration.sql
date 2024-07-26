/*
  Warnings:

  - Made the column `lastsubmission` on table `employee` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `employee` MODIFY `lastsubmission` VARCHAR(255) NOT NULL;
