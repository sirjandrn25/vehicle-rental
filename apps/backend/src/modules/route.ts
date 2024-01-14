import { Router } from "express";
import authRouter from "./auth/route";
import folderRouter from "./folder/route";
const router = Router();
router.use("/auth", authRouter);
router.use("/folders", folderRouter);
export default router;
