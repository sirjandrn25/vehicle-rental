import { asyncErrorHandler } from "../../controllers/error.handler";
import { VehicleModel } from "../../models/vehicle.model";
import { RequestType, ResponseType } from "../../types/common.types";
import { VehicleCreateSchemaType } from "../../zod-schema/vehicle.schema";

export const getAllVehicles = asyncErrorHandler(
  async (req: RequestType<{}>, res: ResponseType) => {
    const vehicles = await VehicleModel.find({
      isDeleted: false,
    });
    return res.send(vehicles);
  }
);

export const createVehicle = asyncErrorHandler(
  async (req: RequestType<VehicleCreateSchemaType>, res: ResponseType) => {
    const data = req.body.data;
    const vehicle = await VehicleModel.create(data);
    return res.status(201).send(vehicle);
  }
);

export const updateVehicleById = asyncErrorHandler(
  async (req: RequestType<VehicleCreateSchemaType>, res: ResponseType) => {
    const { id } = req.params as any;
    const data = req.body.data;

    const vehicle = await VehicleModel.findByIdAndUpdate(
      { _id: id, isDeleted: false },
      {
        ...data,
      }
    );
    return res.status(200).send(vehicle);
  }
);

export const deleteVehicle = asyncErrorHandler(
  async (req: RequestType<{}>, res: ResponseType) => {
    const { id } = req.params as any;
    const vehicle = await VehicleModel.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      { isDeleted: true }
    );
    if (!vehicle) return res.status(404).send();
    return res.status(204).send(vehicle);
  }
);

export const getOneVehicle = asyncErrorHandler(
  async (req: RequestType<{}>, res: ResponseType) => {
    const { id } = req.params as any;
    const vehicle = await VehicleModel.findOne({ _id: id, isDeleted: false });
    if (!vehicle) return res.status(404).send(vehicle);
    return res.send(vehicle);
  }
);
