-- CreateTable
CREATE TABLE "Playground" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "name2" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "ball" TEXT NOT NULL,
    "skater" TEXT NOT NULL,
    "streetball" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,

    CONSTRAINT "Playground_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Playground_id_key" ON "Playground"("id");
