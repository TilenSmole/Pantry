-- CreateTable
CREATE TABLE "storage" (
    "id" SERIAL NOT NULL,
    "item" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "storage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "storage" ADD CONSTRAINT "storage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
