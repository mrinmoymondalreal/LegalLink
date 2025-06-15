/*
  Warnings:

  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_userId_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "city" TEXT,
ADD COLUMN     "district" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "state" TEXT;

-- DropTable
DROP TABLE "profile";
