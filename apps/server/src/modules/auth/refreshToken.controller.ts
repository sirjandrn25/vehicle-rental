import type { Request, Response } from "express";
import { verifyRefreshToken } from "../../utils/token.utils";

export const refreshTokenHandler = async (req: Request, res: Response) => {
  const { token } = req.body;
  try {
    const result = await verifyRefreshToken(token);
    return res.status(200).send(result);
  } catch (err) {
    return res.status(403).send({ message: "Error verifying refresh token" });
  }
};
