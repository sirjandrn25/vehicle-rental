import type { Response } from "express";
import { asyncErrorHandler } from "../../controllers/error.handler";
import { RequestType } from "../../types/common.types";
import UserModel from "../../models/user.model";

export const getLoggedUserController = asyncErrorHandler(
  async (req: RequestType<{}>, res: Response) => {
    const user = req.body.user;
    console.log("user", user);
    const userDb = await UserModel.findById(user._id);
    return res.send(userDb);
  }
);
