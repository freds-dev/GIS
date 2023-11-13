/*
  Warnings:

  - Changed the type of `skater` on the `Playground` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `streetball` on the `Playground` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Playground" DROP COLUMN "skater",
ADD COLUMN     "skater" BOOLEAN NOT NULL,
DROP COLUMN "streetball",
ADD COLUMN     "streetball" BOOLEAN NOT NULL;
