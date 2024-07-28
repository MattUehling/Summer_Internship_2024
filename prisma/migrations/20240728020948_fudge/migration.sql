/*
  Warnings:

  - You are about to alter the column `submissionDate` on the `week` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `DateTime(0)`.

*/
-- AlterTable
ALTER TABLE `week` MODIFY `submissionDate` DATETIME(0) NULL;
