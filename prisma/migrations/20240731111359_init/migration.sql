/*
  Warnings:

  - You are about to drop the column `item` on the `ListItem` table. All the data in the column will be lost.
  - You are about to drop the column `item` on the `storage` table. All the data in the column will be lost.
  - Made the column `amount` on table `ListItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ingredient` on table `ListItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `amount` on table `storage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ingredient` on table `storage` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ListItem" DROP COLUMN "item",
ALTER COLUMN "amount" SET NOT NULL,
ALTER COLUMN "ingredient" SET NOT NULL;

-- AlterTable
ALTER TABLE "storage" DROP COLUMN "item",
ALTER COLUMN "amount" SET NOT NULL,
ALTER COLUMN "ingredient" SET NOT NULL;
