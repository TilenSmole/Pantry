/*
  Warnings:

  - You are about to drop the `recipes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "recipes" DROP CONSTRAINT "recipes_userId_fkey";

-- DropTable
DROP TABLE "recipes";

-- CreateTable
CREATE TABLE "Recipes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "tags" TEXT[],
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "prep_time" TEXT,
    "cook_time" TEXT,
    "userId" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Recipes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recipes" ADD CONSTRAINT "Recipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
