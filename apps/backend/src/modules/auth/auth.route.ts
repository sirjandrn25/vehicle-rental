import { Router } from "express";
import schemaValidator from "../../middleware/schema.validator.middleware";
import { getLoggedUserController } from "./auth.controller";
import { loginController, loginSchema } from "./login.controller";
import {
  refreshTokenController,
  refreshTokenSchema,
} from "./refresh.token.controller";
import { registerController, registerSchema } from "./register.controller";
import { verifyUser } from "../../middleware/auth.middleware";
const router = Router();

router.post("/register", schemaValidator(registerSchema), registerController);
router.post("/login", schemaValidator(loginSchema), loginController);
router.get("/", verifyUser, getLoggedUserController);
router.post(
  "/refresh-token",
  schemaValidator(refreshTokenSchema),
  refreshTokenController
);
export default router;
