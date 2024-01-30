import { Router } from "express";
import { loginController } from "./login.controller";
import { refreshTokenHandler } from "./refreshToken.controller";
import { registerController } from "./register.controller";
import { verifyUser } from "../../middlewares/verifyUser.middleware";
import { getLoggedUserController } from "./loggedUser.controller";
const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/refresh-token", refreshTokenHandler);
router.get("/", verifyUser, getLoggedUserController);
export default router;
