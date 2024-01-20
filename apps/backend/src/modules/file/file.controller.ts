import { PutObjectCommand } from "@aws-sdk/client-s3";
import type { Response } from "express";
import { S3_BUCKET_NAME, s3Client } from "../../config/s3-storage.config";
import { asyncErrorHandler } from "../../controllers/error.handler.controller";
import dbService from "../../utils/database.utils";

export const FileUploader = asyncErrorHandler(
  async (req: any, res: Response) => {
    const files = req.files;
    const user = req.user;
    const response = await generateFiles(files);
    const createData = response?.map((data) => ({
      ...data,
      user_id: user?.id,
    }));
    const dbData = await dbService.file.createMany({
      data: createData,
    });

    res.send(dbData);
  }
);

export const renameFileHandler = asyncErrorHandler(
  async (req: any, res: Response) => {
    const { id } = req.params;
    const user = req.user;
    const fileDb = await dbService.file.findUnique({
      where: { id },
    });
    if (fileDb?.user_id != user?.id)
      return res.status(403).send("You do not have permission");

    const response = await dbService.file.update({
      where: { id },
      data: {
        name: req.body.name,
      },
    });
    return res.status(200).send(response);
  }
);

const getTimeStamp = () => {
  return new Date().toISOString().replace(/[^0-9]/g, ""); // Remove non-numeric characters
};
export const generateFiles = async (files: any = []) => {
  let newFiles: any[] = [];
  for (let file of files) {
    const response = await uploadFileToStorage(file);
    newFiles.push(response);
  }
  return newFiles;
};

const uploadFileToStorage = async (file: any) => {
  const timeStamp = getTimeStamp();
  const objectKey = `${file.originalname}-${timeStamp}`.toLowerCase();
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: objectKey,
    Body: file.buffer,
    AccessControlPolicy: { Grants: [] },
  };

  // Upload the file to S3
  await s3Client.send(new PutObjectCommand(params));
  const fileUrl = `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${objectKey}`;
  return { url: fileUrl, name: file?.originalname };
};
