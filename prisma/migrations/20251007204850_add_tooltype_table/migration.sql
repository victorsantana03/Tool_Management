/*
  Warnings:

  - You are about to drop the column `description` on the `Tool` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Tool` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Tool` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `Tool` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tool" DROP COLUMN "description",
DROP COLUMN "name",
DROP COLUMN "quantity",
ADD COLUMN     "typeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ToolType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ToolType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ToolType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
