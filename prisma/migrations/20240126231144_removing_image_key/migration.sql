/*
  Warnings:

  - You are about to drop the column `imageKey` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `key` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `mainImageKey` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "imageKey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "mainImageKey";
