import { Router } from "express";
import schemaValidator from "../../middleware/schema.validator.middleware";
import { FolderModel } from "../../zod";
import { createFolder, deleteFolder, readFolder } from "./folder.controller";
import { verifyUser } from "../../middleware/auth.middleware";
const router = Router();
router.get("/", verifyUser, readFolder);
router.delete("/:folderName", deleteFolder);
router.post("/", schemaValidator(FolderModel), verifyUser, createFolder);

export default router;
