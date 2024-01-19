import { type Response } from "express";
import { asyncErrorHandler } from "../../controllers/error.handler.controller";
import dbService from "../../utils/database.utils";
import FolderUtils from "./folder.utils";

export const bucketName = process.env.S3_BUCKET_NAME as string;

export const createFolder = asyncErrorHandler(
  async (req: any, res: Response) => {
    const { name, parent_id = "" } = req.body;
    const user = req.user;
    try {
      if (parent_id) {
        const parentFolder = await dbService.folder.findUnique({
          where: {
            id: parent_id,
          },
        });
        if (!parentFolder)
          return res.status(404).json("parent path not found !!");
      }

      const folder = await dbService.folder.create({
        data: {
          parent_id,
          name,
          user_id: user?.id,
        },
      });

      return res.status(201).send(folder);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).send(error);
    }
  }
);
export const readFolder = asyncErrorHandler(async (req: any, res: Response) => {
  const { id = "" } = req.params;
  const user = req.user;
  try {
    const folder = await dbService.folder.findUnique({
      where: {
        id,
      },
      include: {
        childrens: true,
        files: true,
      },
    });
    if (!folder) return res.status(404).send("Not Found");
    if (folder.user_id !== user?.id)
      return res
        .status(403)
        .send("You don't have permission to access this folder");
    return res.send();
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
});

export const readFolders = asyncErrorHandler(
  async (req: any, res: Response) => {
    const user = req.user;
    const folders = await dbService.folder.findMany({
      where: {
        user_id: user?.id,
      },
    });
    return res.status(200).send(folders);
  }
);

export const deleteFolder = asyncErrorHandler(
  async (req: any, res: Response) => {
    const { folderName } = req.params;
    const user = req.user;
    try {
      await FolderUtils.deleteByPath({
        user,
        folderName,
      });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

// const awsS3CreateBucket = async () => {
//   try {
//     const createBucketCommand = new CreateBucketCommand({
//       Bucket: bucketName,
//     });

//     await s3Client.send(createBucketCommand);
//     console.log("create bucket successfully");
//   } catch (error) {
//     console.log("bucket name ", bucketName);
//     console.log("bucket error", error);
//   }
// };
