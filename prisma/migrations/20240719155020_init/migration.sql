-- CreateTable
CREATE TABLE "Foods" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "calories" DOUBLE PRECISION,
    "protein" DOUBLE PRECISION,
    "fat" DOUBLE PRECISION,
    "carbohydrates" DOUBLE PRECISION,
    "fiber" DOUBLE PRECISION,
    "sugar" DOUBLE PRECISION,
    "allergens" TEXT[],
    "isVegan" BOOLEAN,
    "isVegetarian" BOOLEAN,

    CONSTRAINT "Foods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingList" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recipesId" INTEGER,

    CONSTRAINT "ShoppingList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListItem" (
    "id" SERIAL NOT NULL,
    "listId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ListItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShoppingList" ADD CONSTRAINT "ShoppingList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingList" ADD CONSTRAINT "ShoppingList_recipesId_fkey" FOREIGN KEY ("recipesId") REFERENCES "recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListItem" ADD CONSTRAINT "ListItem_listId_fkey" FOREIGN KEY ("listId") REFERENCES "ShoppingList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
