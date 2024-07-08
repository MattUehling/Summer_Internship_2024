-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `lastsubmission` INTEGER NULL,

    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `timetable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` INTEGER NOT NULL,

    INDEX `employeeId`(`employeeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `week` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `timeTableId` INTEGER NOT NULL,
    `monday` INTEGER NULL,
    `tuesday` INTEGER NULL,
    `wednesday` INTEGER NULL,
    `thursday` INTEGER NULL,
    `friday` INTEGER NULL,
    `saturday` INTEGER NULL,
    `sunday` INTEGER NULL,

    INDEX `timeTableId`(`timeTableId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `timetable` ADD CONSTRAINT `timetable_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `employee`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `week` ADD CONSTRAINT `week_ibfk_1` FOREIGN KEY (`timeTableId`) REFERENCES `timetable`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
