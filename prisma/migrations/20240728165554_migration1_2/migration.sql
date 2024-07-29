-- AlterTable
ALTER TABLE `week` MODIFY `submissionDate` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `bankinginformation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` INTEGER NOT NULL,
    `accountNumber` INTEGER NULL,
    `routingNumber` INTEGER NULL,
    `hourlyRate` INTEGER NULL,

    INDEX `employeeId`(`employeeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bankinginformation` ADD CONSTRAINT `bankinginformation_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `employee`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
