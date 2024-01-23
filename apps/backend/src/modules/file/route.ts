import { Router } from "express";
import { verifyUser } from "../../middleware/auth.middleware";
import { multipleUpload } from "../../middleware/multer.middleware";
import schemaValidator from "../../middleware/schema.validator.middleware";
import { FileModelRename } from "../../zod";
import {
  FileUploader,
  deleteFileHandler,
  renameFileHandler,
  retrieveUserFiles,
} from "./file.controller";

const router = Router();
router.post("/", verifyUser, multipleUpload, FileUploader);
router.get("/", verifyUser, retrieveUserFiles);
router.delete("/:id", verifyUser, deleteFileHandler);
router.post(
  "/:id",
  schemaValidator(FileModelRename),
  verifyUser,
  renameFileHandler
);

export default router;
