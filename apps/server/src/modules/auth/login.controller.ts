import type { Request, Response } from "express";
import UserModel from "../../user.model";
import { ComparePasswordWithHash } from "../../utils/hash.utils";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/token.utils";
export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) return res.status(400).send("email does not exist!!");
  console.log("user", user.password);
  const isMatchedPassword = await ComparePasswordWithHash(
    password,
    user.password
  );
  if (!isMatchedPassword)
    return res.status(400).send("credentials do not match");

  const userSession = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    email_verified: user.email_verified,
  };
  const access_token = await generateAccessToken(userSession);
  const refresh_token = await generateRefreshToken(userSession);

  res.status(200).send({
    user: userSession,
    access_token,
    refresh_token,
  });
};
