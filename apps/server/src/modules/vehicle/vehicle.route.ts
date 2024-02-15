import { Router } from "express";
import schemaValidator from "../../middlewares/schema.validator.middleware";
import { VehicleCreateSchema } from "../../zod-schema/vehicle.schema";
import {
  createVehicle,
  deleteVehicle,
  getAllVehicles,
  getOneVehicle,
  updateVehicleById,
} from "./vehicle.controller";
const router = Router();

router.get("/:id", getOneVehicle);
router.delete("/:id", deleteVehicle);
router.put("/:id", schemaValidator(VehicleCreateSchema), updateVehicleById);
router.get("/", getAllVehicles);
router.post("/", schemaValidator(VehicleCreateSchema), createVehicle);
export default router;
