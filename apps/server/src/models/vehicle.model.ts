import mongoose from "mongoose";
import { DbSchema } from "./common.models";

export enum VehicleTypeEnum {
  CYCLE = 1,
  BIKE = 2,
  SCOOTER = 3,
  CAR = 4,
}
const VehicleSchema = new DbSchema({
  name: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    enum: VehicleTypeEnum,
    require: true,
  },
  number: String,
  description: String,
  image: String,
  rate: Number, // per hour rate
  isDeleted: {
    type: Boolean,
    defaultValue: false,
  },
});

export const VehicleModel = mongoose.model("Vehicle", VehicleSchema);
