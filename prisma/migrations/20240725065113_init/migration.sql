/*
  Warnings:

  - You are about to drop the column `name` on the `ListItem` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `ListItem` table. All the data in the column will be lost.
  - Added the required column `item` to the `ListItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ListItem" DROP COLUMN "name",
DROP COLUMN "quantity",
ADD COLUMN     "item" TEXT NOT NULL;
