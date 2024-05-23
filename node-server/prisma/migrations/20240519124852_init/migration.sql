/*
  Warnings:

  - You are about to drop the column `userId` on the `favorite` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `favorite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "favorite" DROP CONSTRAINT "favorite_userId_fkey";

-- AlterTable
ALTER TABLE "favorite" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "user"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
