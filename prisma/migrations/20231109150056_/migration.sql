/*
  Warnings:

  - You are about to drop the column `playground` on the `Report` table. All the data in the column will be lost.
  - The `status` column on the `Report` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `playgroundId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'IN_PROGRESS', 'DONE');

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "playground",
ADD COLUMN     "playgroundId" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_playgroundId_fkey" FOREIGN KEY ("playgroundId") REFERENCES "Playground"("id") ON DELETE CASCADE ON UPDATE CASCADE;
