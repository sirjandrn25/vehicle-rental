/*
  Warnings:

  - Added the required column `user_id` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_folder_id_fkey";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "folder_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
