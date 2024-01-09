import type { Request, Response } from "express";
import { z } from "zod";
import { asyncErrorHandler } from "../../controllers/error.handler.controller";
import dbService from "../../utils/database.utils";
import { HashingUtils } from "../../utils/hashing.utils";
import JwtTokenUtils from "../../utils/jwt.token.utils";
import CustomError from "../../utils/customError.utils";

export const loginSchema = z.object({
  email: z
    .string()
    .email()
    .min(1)
    .max(255)
    .transform((v) => v.toLowerCase()),
  password: z.string().min(6).max(255),
});
export const loginController = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await dbService.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw new CustomError("this user does not exist", 403);

    const isMatched = await HashingUtils.compare(
      password,
      user?.password as string
    );
    if (!isMatched) throw new CustomError("Credentials Doesn't matched", 403);

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
