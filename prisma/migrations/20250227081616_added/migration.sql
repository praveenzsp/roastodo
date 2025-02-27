/*
  Warnings:

  - Made the column `expiresAt` on table `Todo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "expired" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "expiresAt" SET NOT NULL;
