/*
  Warnings:

  - The `ball` column on the `Playground` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Playground" DROP COLUMN "ball",
ADD COLUMN     "ball" BOOLEAN NOT NULL DEFAULT false;
