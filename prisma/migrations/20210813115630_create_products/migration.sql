-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" MONEY NOT NULL,
    "qtt" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);
