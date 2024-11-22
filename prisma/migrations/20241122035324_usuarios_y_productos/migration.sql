/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `name`;

-- RedefineIndex
CREATE UNIQUE INDEX `user_email_key` ON `user`(`email`);
DROP INDEX `User_email_key` ON `user`;
