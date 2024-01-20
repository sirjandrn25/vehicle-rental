import { type Response } from "express";
import { asyncErrorHandler } from "../../controllers/error.handler.controller";
import dbService from "../../utils/database.utils";
import { generateFiles } from "../file/file.controller";

export const bucketName = process.env.S3_BUCKET_NAME as string;

export const createFolder = asyncErrorHandler(
  async (req: any, res: Response) => {
    const { name, parent_id = "" } = req.body;
    const user = req.user;

    const folder = await dbService.folder.create({
      data: {
        parent_id: parent_id || null,
        name,
        user_id: user?.id,
      },
    });

    return res.status(201).send(folder);
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
    return res.send(folder);
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
    const { id } = req.params;
    const user = req.user;
    const folder = await dbService.folder.findUnique({
      where: {
        id,
      },
    });
    console.log("folder", folder);
    if (!folder) return res.status(404).send("not found");
    if (folder.user_id !== user.id)
      return res.status(403).send("You don't have permission.");
    await dbService.folder.delete({
      where: {
        id: folder?.id,
      },
    });
    return res.status(204).send();
  }
);

export const renameFolderHandler = asyncErrorHandler(
  async (req: any, res: Response) => {
    const { id } = req.params;
    const user = req.user;
    const { name } = req.body;
    const folder = await dbService.folder.findUnique({
      where: {
        id,
      },
    });
    if (!folder) return res.status(404).send("not found");
    if (folder?.user_id !== user.id)
      return res.status(403).send("you don't have permission");
    const updateFolder = await dbService.folder.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    return res.status(200).send(updateFolder);
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
export const uploadFileToFolderHandler = asyncErrorHandler(
  async (req: any, res: Response) => {
    const user = req.user;
    const { id } = req.params;
    const files = req.files;
    const response = await generateFiles(files);
    const createData = response?.map((data) => ({
      ...data,
      user_id: user?.id,
      folder_id: id,
    }));
    console.log("createData", createData);
    const dbData = await dbService.file.createMany({
      data: createData,
    });
    return res.send(dbData);
  }
);
