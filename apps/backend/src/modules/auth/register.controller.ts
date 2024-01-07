import { ObjectUtils } from "core";
import type { Request, Response } from "express";
import { z } from "zod";
import { asyncErrorHandler } from "../../controllers/error.handler.controller";
import CustomError from "../../utils/customError.utils";
import dbService from "../../utils/database.utils";
import { HashingUtils } from "../../utils/hashing.utils";

export const registerSchema = z.object({
  email: z
    .string()
    .email()
    .min(1)
    .max(255)
    .transform((v) => v.toLowerCase()),
  password: z.string().min(8).max(255),
  name: z.string().min(1).max(255),
});
export const registerController = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { email, name, password, role = "USER" } = req?.body || {};
    const user = await dbService.user.findFirst({
      where: { email },
    });
    if (user) throw new CustomError("User already exists!!", 400);
    const hashed_password = await HashingUtils.hash(password);
    const newUser = await dbService.user.create({
      data: {
        email,
        name,
        role,
        password: hashed_password,
      },
    });

    res.status(201).json(ObjectUtils.removeNode(newUser as any, "password"));
  }
);
