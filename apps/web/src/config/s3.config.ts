import {
  CreateBucketCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
export const s3Client = new S3Client({
  region: process.env.S3_REGION as string,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY as string,
    secretAccessKey: process.env.S3_SECRETE_KEY as string,
  },
});
export const bucketName = process.env.S3_BUCKET_NAME as string;

const awsS3CreateBucket = async () => {
  try {
    const createBucketCommand = new CreateBucketCommand({
      Bucket: bucketName,
    });

    await s3Client.send(createBucketCommand);
    console.log("create bucket successfully");
  } catch (error) {
    console.log("bucket name ", bucketName);
    console.log("bucket error", error);
  }
};
