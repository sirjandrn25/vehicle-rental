import { Router } from "express";
import { verifyUser } from "../../middleware/auth.middleware";
import schemaValidator from "../../middleware/schema.validator.middleware";
import { FolderCreateModel } from "../../zod";
import { createFolder, deleteFolder, readFolder } from "./folder.controller";
const router = Router();
router.get("/", verifyUser, readFolder);
router.delete("/:folderName", deleteFolder);
router.post("/", schemaValidator(FolderCreateModel), verifyUser, createFolder);

export default router;
