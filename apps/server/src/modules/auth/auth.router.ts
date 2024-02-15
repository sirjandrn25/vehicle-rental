import { Router } from "express";
import schemaValidator from "../../middlewares/schema.validator.middleware";
import { verifyUser } from "../../middlewares/verifyUser.middleware";
import {
  PasswordChangeSchema,
  RefreshTokenSchema,
  UserLoginSchema,
  UserRegisterSchema,
  UserUpdateSchema,
} from "../../zod-schema/user.schema";
import { getLoggedUserController } from "./loggedUser.controller";
import { loginController } from "./login.controller";
import { passwordChangeHandler } from "./password.change.controller";
import { refreshTokenHandler } from "./refreshToken.controller";
import { registerController } from "./register.controller";
import { updateUserProfile } from "./user.controller";
const router = Router();
router.post(
  "/register",
  schemaValidator(UserRegisterSchema),
  registerController
);
router.post("/login", schemaValidator(UserLoginSchema), loginController);
router.post(
  "/refresh-token",
  schemaValidator(RefreshTokenSchema),
  refreshTokenHandler
);
router.get("", verifyUser, getLoggedUserController);
router.post(
  "/password-change",
  schemaValidator(PasswordChangeSchema),
  verifyUser,
  passwordChangeHandler
);
router.post(
  "/update-profile",
  schemaValidator(UserUpdateSchema),
  verifyUser,
  updateUserProfile
);
export default router;
