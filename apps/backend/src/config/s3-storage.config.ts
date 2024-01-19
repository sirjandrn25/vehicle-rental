import { S3Client } from "@aws-sdk/client-s3";
import { DictionaryType } from "core";
console.log("process.env.S3_REGION", process.env.S3_REGION);
export const s3Client = new S3Client({
  region: process.env.S3_REGION as string,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY as string,
    secretAccessKey: process.env.S3_SECRETE_KEY as string,
  },
});

export const S3_BUCKET_NAME = "my-drive-st-bucket";
export const getFolderPathByUser = (user: DictionaryType) => {
  return `${makeIdentifier(user.name)}-${user.id}`;
};

export const makeIdentifier = (name: string) => {
  return name.toLowerCase().replace(" ", "-");
};
