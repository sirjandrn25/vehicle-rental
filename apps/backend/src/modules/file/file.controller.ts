import { PutObjectCommand } from "@aws-sdk/client-s3";
import type { Response } from "express";
import {
  S3_BUCKET_NAME,
  getFolderPathByUser,
  s3Client,
} from "../../config/s3-storage.config";
import { asyncErrorHandler } from "../../controllers/error.handler.controller";

export const FileUploader = asyncErrorHandler(
  async (req: any, res: Response) => {
    const files = req.files;
    const user = req.user;
    const basePath = `${getFolderPathByUser(user || "")}`;
    const folderPath = req.body?.folderPath;

    await generateFiles(files, `${basePath}/${folderPath || ""}`);
    res.send("Successfully uploaded file");
  }
);

const getTimeStamp = () => {
  return new Date().toISOString().replace(/[^0-9]/g, ""); // Remove non-numeric characters
};
const generateFiles = async (files: any = [], folderPath?: string) => {
  let newFiles: any[] = [];
  for (let file of files) {
    const response = await uploadFileToStorage(file, folderPath);
    newFiles.push(response);
  }
  return newFiles;
};

const uploadFileToStorage = async (file: any, folderPath?: string) => {
  const timeStamp = getTimeStamp();
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: `${folderPath || ""}${file.originalname}-${timeStamp}`,
    Body: file.buffer,
    AccessControlPolicy: { Grants: [] },
  };

  // Upload the file to S3
  await s3Client.send(new PutObjectCommand(params));
};
