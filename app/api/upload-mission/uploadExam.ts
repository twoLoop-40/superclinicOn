import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

type UploadableFile = {
  file: File;
};

export async function uploadToS3({ file }: UploadableFile) {
  const s3Client = new S3Client({
    region: process.env.AWS_REGION || "",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
  });

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME || "",
    Key: `${Date.now()}-${file.name}`,
    Body: file,
  };

  try {
    const uploadResult = await s3Client.send(
      new PutObjectCommand(uploadParams)
    );

    // S3 객체의 URL 생성
    const fileUrl = `https://${uploadParams.Bucket}.s3.ap-northeast-2.amazonaws.com/${uploadParams.Key}`;

    return NextResponse.json({ ok: true, fileUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      ok: false,
      error: "S3 업로드에 실패",
      fileUrl: "",
    });
  }
}
