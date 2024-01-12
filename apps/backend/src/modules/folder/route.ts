import { Router } from "express";
import { createFolder } from "./folder.controller";
import { verifyUser } from "../../middleware/auth.middleware";
const router = Router();
router.get("/", verifyUser);
router.post("/", createFolder, verifyUser);
