import type { Request, Response } from "express";
import { z } from "zod";
import { asyncErrorHandler } from "../../controllers/error.handler.controller";
import dbService from "../../utils/database.utils";
import { HashingUtils } from "../../utils/hashing.utils";
import JwtTokenUtils from "../../utils/jwt.token.utils";

export const loginSchema = z.object({
  email: z
    .string()
    .email()
    .min(1)
    .max(255)
    .transform((v) => v.toLowerCase()),
  password: z.string().min(8).max(255),
});
export const loginController = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await dbService.user.findUnique({
      where: {
        email,
      },
    });
    if (!user)
      return res.status(403).send({
        email: "this email does not exist!!",
      });
    const isMatched = await HashingUtils.compare(
      password,
      user?.password as string
    );
    if (!isMatched)
      return res.status(403).send({
        password: "password is doesn't match !!",
      });
    const userSession = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      email_verified: user.email_verified,
    };
    const access_token = await JwtTokenUtils.generateAccessToken(userSession);
    const refresh_token = await JwtTokenUtils.generateRefreshToken(userSession);

    res.status(200).send({
      user: userSession,
      access_token,
      refresh_token,
    });
  }
);
