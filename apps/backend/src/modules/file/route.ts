import { Router } from "express";
import { verifyUser } from "../../middleware/auth.middleware";
import { multipleUpload } from "../../middleware/multer.middleware";
import schemaValidator from "../../middleware/schema.validator.middleware";
import { FileModelRename } from "../../zod";
import { FileUploader, renameFileHandler } from "./file.controller";

const router = Router();
router.post("/", verifyUser, multipleUpload, FileUploader);
router.post(
  "/:id",
  schemaValidator(FileModelRename),
  verifyUser,
  renameFileHandler
);

export default router;
