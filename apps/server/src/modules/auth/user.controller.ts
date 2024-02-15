import { asyncErrorHandler } from "../../controllers/error.handler";
import UserModel from "../../models/user.model";
import { RequestType, ResponseType } from "../../types/common.types";
import { UserUpdateSchemaType } from "../../zod-schema/user.schema";

export const updateUserProfile = asyncErrorHandler(
  async (req: RequestType<UserUpdateSchemaType>, res: ResponseType) => {
    const { user, data } = req.body;
    const userDb = await UserModel.findAndUpdate(
      {
        _id: user?._id,
      },
      {
        ...data,
      }
    );
    delete userDb.password;
    return res.send(userDb);
  }
);
