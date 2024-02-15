import { Router } from "express";
import AuthRouter from "./auth/auth.router";
import VehicleRouter from "./vehicle/vehicle.route";
const router = Router();
router.use("/auth", AuthRouter);
router.use("/vehicles", VehicleRouter);
export default router;
