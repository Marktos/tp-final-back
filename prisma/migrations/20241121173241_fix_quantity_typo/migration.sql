/*
  Warnings:

  - You are about to drop the column `quatity` on the `product` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `quatity`,
    ADD COLUMN `quantity` INTEGER NOT NULL;
