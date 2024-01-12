import type { Request, Response } from "express";
import { asyncErrorHandler } from "../../controllers/error.handler.controller";
import dbService from "../../utils/database.utils";
import CustomError from "../../utils/customError.utils";

export const createFolder = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { name, user, current_path } = req.body;
    const identifier = makeIdentifier(name);
    const path = `${current_path}/${identifier}`;

    //checking existing folder
    const folder = await dbService.folder.findMany({
      where: {
        path,
        user_id: user?.id,
      },
    });
    if (folder) throw new CustomError(`Couldn't create duplicate folder`, 403);

    // create new folder
    const newFolder = await dbService.folder.create({
      data: {
        name,
        path,
        user_id: user?.id,
      },
    });
    return res.status(201).send(newFolder);
  }
);

const makeIdentifier = (label: string) => {
  return label?.toLowerCase().split(" ").join("-");
};
