-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "amounts" TEXT[];

-- CreateTable
CREATE TABLE "notes" (
    "id" SERIAL NOT NULL,
    "note" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "recipeID" INTEGER NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_recipeID_fkey" FOREIGN KEY ("recipeID") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
