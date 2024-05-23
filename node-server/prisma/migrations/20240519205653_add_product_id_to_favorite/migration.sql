/*
  Warnings:

  - The `id` column on the `favorite` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `productId` to the `favorite` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "favorite_id_key";

-- AlterTable
ALTER TABLE "favorite" ADD COLUMN     "productId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "favorite_pkey" PRIMARY KEY ("id");
