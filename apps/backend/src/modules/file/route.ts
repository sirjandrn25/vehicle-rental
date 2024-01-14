import { Router } from "express";
import { multipleUpload } from "../../middleware/multer.middleware";
import { FileUploader } from "./file.controller";
import { verifyUser } from "../../middleware/auth.middleware";

const router = Router();
router.post("/", verifyUser, multipleUpload, FileUploader);

export default router;
