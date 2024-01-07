import type { Request, Response } from "express";
import { z } from "zod";
import { asyncErrorHandler } from "../../controllers/error.handler.controller";
import JwtTokenUtils from "../../utils/jwt.token.utils";

export const refreshTokenSchema = z.object({
  token: z.string({
    required_error: "refresh token is required !!",
  }),
});
export const refreshTokenController = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { token } = req.body;
    try {
      const result = await JwtTokenUtils.verifyRefreshToken(token);
      return res.status(200).send(result);
    } catch (err) {
      return res.status(403).send({ message: "Error verifying refresh token" });
    }
  }
);
