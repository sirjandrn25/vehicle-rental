import { asyncErrorHandler } from "../../controllers/error.handler";
import { RequestType, ResponseType } from "../../types/common.types";
import { verifyRefreshToken } from "../../utils/token.utils";
import { RefreshTokenSchemaType } from "../../zod-schema/user.schema";

export const refreshTokenHandler = asyncErrorHandler(
  async (req: RequestType<RefreshTokenSchemaType>, res: ResponseType) => {
    const { token } = req.body.data;
    try {
      const result = await verifyRefreshToken(token);
      return res.status(200).send(result);
    } catch (err) {
      return res.status(403).send({ message: "Error verifying refresh token" });
    }
  }
);
