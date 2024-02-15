import { z } from "zod";
import { VehicleTypeEnum } from "../models/vehicle.model";

export const VehicleValidatorSchema = z.object({
  name: z.string().min(5),
  number: z.string(),
  type: z.nativeEnum(VehicleTypeEnum),
  description: z.string().optional(),
  image: z.string(),
  rate: z.number(),
  created_at: z.string(),
});

export const VehicleCreateSchema = VehicleValidatorSchema.omit({
  created_at: true,
});

export type VehicleCreateSchemaType = z.infer<typeof VehicleCreateSchema>;
