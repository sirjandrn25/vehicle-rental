/*
  Warnings:

  - You are about to drop the column `path` on the `Folder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,name,parent_id]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Folder_path_key";

-- DropIndex
DROP INDEX "Folder_user_id_path_key";

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "path";

-- CreateIndex
CREATE UNIQUE INDEX "Folder_user_id_name_parent_id_key" ON "Folder"("user_id", "name", "parent_id");
