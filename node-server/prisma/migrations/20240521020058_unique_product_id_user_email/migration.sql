/*
  Warnings:

  - A unique constraint covering the columns `[userEmail,productId]` on the table `favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "favorite_userEmail_productId_key" ON "favorite"("userEmail", "productId");
