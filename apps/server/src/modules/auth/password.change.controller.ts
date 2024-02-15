import { asyncErrorHandler } from "../../controllers/error.handler";
import UserModel from "../../models/user.model";
import { RequestType, ResponseType } from "../../types/common.types";
import { ComparePasswordWithHash, HashPassword } from "../../utils/hash.utils";
import { PasswordChangeSchemaType } from "../../zod-schema/user.schema";

export const passwordChangeHandler = asyncErrorHandler(
  async (req: RequestType<PasswordChangeSchemaType>, res: ResponseType) => {
    const { password, old_password } = req.body.data;
    const user = req.body.user;
    const userDb = await UserModel.findById(user._id);
    const isMatched = await ComparePasswordWithHash(
      old_password,
      userDb.password
    );
    if (!isMatched) return res.status(403).send("Old password doesn't matched");
    const hashedPassword = await HashPassword(password);
    await UserModel.updateOne({ _id: user._id }, { password: hashedPassword });
    return res.status(200).send("Successfully Changed");
  }
);
