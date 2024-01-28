import { Router } from "express";
import { verifyUser } from "../../middleware/auth.middleware";
import { multipleUpload } from "../../middleware/multer.middleware";
import schemaValidator from "../../middleware/schema.validator.middleware";
import { FolderCreateModel, FolderRenameModel } from "../../zod";
import {
  createFolder,
  deleteFolder,
  getFolderFiles,
  readFolder,
  readFolders,
  renameFolderHandler,
  uploadFileToFolderHandler,
} from "./folder.controller";
const router = Router();
router.get("/:id", verifyUser, readFolder);
router.get("/", verifyUser, readFolders);
router.delete("/:id", verifyUser, deleteFolder);
router.post(
  "/:id/files",
  verifyUser,
  multipleUpload,
  uploadFileToFolderHandler
);
router.get("/:id/files", verifyUser, getFolderFiles);
router.put(
  "/:id/rename",
  schemaValidator(FolderRenameModel),
  verifyUser,
  renameFolderHandler
);
router.post("/", schemaValidator(FolderCreateModel), verifyUser, createFolder);

export default router;
