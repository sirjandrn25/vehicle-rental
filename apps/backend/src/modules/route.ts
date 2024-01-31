import { Router } from "express";
import authRouter from "./auth/auth.route";
import folderRouter from "./folder/folder.route";
import fileRouter from "./file/file.route";
const router = Router();
router.use("/auth", authRouter);
router.use("/folders", folderRouter);
router.use("/files", fileRouter);
export default router;
