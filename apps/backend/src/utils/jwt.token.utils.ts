import { userType } from "../types/user.types";
const jwt = require("jsonwebtoken");

export default class JwtTokenUtils {
  static async generateAccessToken(info: Omit<userType, "password">) {
    const expire_duration = "180s";
    const token = await jwt.sign(info, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: expire_duration,
    });
    return token;
  }

  static async generateRefreshToken(info: Omit<userType, "password">) {
    const expire_duration = "1hr";
    const token = await jwt.sign(info, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: expire_duration,
    });
    return token;
  }

  static async verifyRefreshToken(token: string) {
    const decoded = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const { email, name, role, id } = decoded || {};

    const access_token = await JwtTokenUtils.generateAccessToken({
      email,
      name,
      role,
      id,
      email_verified: false,
    });

    return {
      access_token,
      user: decoded,
      refresh_token: token,
    };
  }
}
