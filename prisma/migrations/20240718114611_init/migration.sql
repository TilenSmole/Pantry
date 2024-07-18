/*
  Warnings:

  - You are about to drop the column `userId` on the `recipes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "recipes" DROP CONSTRAINT "recipes_userId_fkey";

-- AlterTable
ALTER TABLE "recipes" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
