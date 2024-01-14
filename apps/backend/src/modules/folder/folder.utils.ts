import {
  DeleteObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { DictionaryType } from "core";
import {
  S3_BUCKET_NAME,
  getFolderPathByUser,
  makeIdentifier,
  s3Client,
} from "../../config/s3-storage.config";

type CreateFolderProps = {
  user: DictionaryType;
  folderName?: string;
  currentPath?: string;
};

type DeleteFolderProps = Omit<CreateFolderProps, "currentPath">;
type ReadFolderProps = Omit<CreateFolderProps, "currentPath">;
export default class FolderUtils {
  static async create({ folderName, currentPath, user }: CreateFolderProps) {
    const identifier = folderName?.replace(" ", "-");
    const basePath = `${getFolderPathByUser(user)}${
      currentPath ? "/" + currentPath : ""
    }`;
    const path = `${basePath}/${identifier ? identifier + "/" : ""}`;
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: path,
      Body: "",
      metadata: {
        name: folderName,
      },
    };
    const response = await s3Client.send(new PutObjectCommand(params));
    return {
      response,
      path,
    };
  }
  static async readByPath({ folderName, user }: ReadFolderProps) {
    const prefix = `${getFolderPathByUser(user)}${makeIdentifier(
      folderName ?? ""
    )}`;
    const params = {
      Bucket: S3_BUCKET_NAME,
      Prefix: prefix,
    };

    const response: any = await s3Client.send(new ListObjectsV2Command(params));

    // Extract common prefixes (folders) from the response
    return response.Contents;
  }

  static async deleteByPath({ folderName, user }: DeleteFolderProps) {
    const data = await FolderUtils.readByPath({ folderName, user });

    // Delete each object in the folder
    const deletePromises = data.map((obj: any) =>
      s3Client.send(
        new DeleteObjectCommand({
          Bucket: S3_BUCKET_NAME,
          Key: obj.Key,
        })
      )
    );

    // Wait for all delete operations to complete
    await Promise.all(deletePromises);
  }
}
