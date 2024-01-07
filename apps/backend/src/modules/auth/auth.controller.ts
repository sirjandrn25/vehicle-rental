import { ObjectUtils } from "core";
import type { Response } from "express";
import { asyncErrorHandler } from "../../controllers/error.handler.controller";
import { WithUserRequestType } from "../../types/server.types";
import dbService from "../../utils/database.utils";
export const getLoggedUserController = asyncErrorHandler(
  async (req: WithUserRequestType, res: Response) => {
    const user = req.user;

    if (!user) return res.status(403).send("Not logged in");
    const result = await dbService.user.findUnique({
      where: {
        email: user.email,
      },
    });
    return res
      .status(200)
      .send(ObjectUtils.removeNode(result as any, "password"));
  }
);
