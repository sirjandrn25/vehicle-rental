import type { Request, Response } from "express";
import UserModel from "../../user.model";
import { HashPassword } from "../../utils/hash.utils";

export const registerController = async (req: Request, res: Response) => {
  const { email, name, password, role = "USER" } = req.body;
  const user = await UserModel.findOne({
    email,
  });
  if (user) return res.status(400).send("this email is already registered");
  const hashedPassword = await HashPassword(password);
  const newUser = await UserModel.create({
    email,
    name,
    password: hashedPassword,
    role,
  });

  return res.status(200).send(newUser);
};
