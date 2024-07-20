/*
  Warnings:

  - You are about to drop the column `recipesId` on the `ShoppingList` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ShoppingList" DROP CONSTRAINT "ShoppingList_recipesId_fkey";

-- AlterTable
ALTER TABLE "ListItem" ALTER COLUMN "unit" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ShoppingList" DROP COLUMN "recipesId";
