import type { Response } from "express";
import { UserRequestType } from "../../middlewares/verifyUser.middleware";
import UserModel from "../../user.model";

export const getLoggedUserController = async (
  req: UserRequestType,
  res: Response
) => {
  const user = req.user;
  const userdb = await UserModel.findById(user.id);
  return res.send(userdb);
};
