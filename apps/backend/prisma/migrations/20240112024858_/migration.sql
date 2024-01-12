/*
  Warnings:

  - You are about to drop the column `base_path` on the `Folder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,path]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "base_path";

-- CreateIndex
CREATE UNIQUE INDEX "Folder_user_id_path_key" ON "Folder"("user_id", "path");
