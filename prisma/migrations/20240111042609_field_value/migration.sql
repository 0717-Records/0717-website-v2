/*
  Warnings:

  - Added the required column `value` to the `Field` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Field" ADD COLUMN     "value" TEXT NOT NULL;
