import { NextRequest, NextResponse } from "next/server";
import { uploadToS3 } from "./uploadExam";
import { uploadToYouTube } from "./uploadYouTube"; // 가정: YouTube 업로드 함수
import { prisma } from "./prismaClient"; // 가정: Prisma 클라이언트
import { Worksheet } from "@(user)/teacher/components/mission-form";

async function uploadMission(req: NextRequest) {
  const formdata = await req.formData();

  const worksheets = formdata.getAll(); // Worksheet 데이터
  const goals = formdata.get("goals"); // Goal 데이터
  const dateRange = formdata.get("dateRange"); // DateRange 데이터

  // Worksheet에 대한 파일 업로드 및 URL 저장
  for (const worksheet of worksheets) {
    let fileUrl = "";
    let videoUrl = "";

    if (worksheet.file) {
      const uploadResult = await uploadToS3({ file: worksheet.file });
      if (uploadResult.ok) {
        fileUrl = await uploadResult.json().then((data) => data.fileUrl);
      }
    }

    if (worksheet.video) {
      const uploadResult = await uploadToYouTube(worksheet.video); // 가정: YouTube 업로드 함수
      if (uploadResult.ok) {
        videoUrl = uploadResult.json().then((data) => data.videoUrl);
      }
    }

    // Prisma를 사용하여 URL 저장
    await prisma.worksheet.create({
      data: {
        type: worksheet.type,
        fileCode: worksheet.fileCode,
        fileName: worksheet.fileName,
        fileUrl,
        videoUrl,
        // ... 다른 필드
      },
    });
  }

  // Mission과 Worksheet 연결, Goal 저장, DateRange 저장 등의 로직
  // ...

  return NextResponse.json({ ok: true });
}

export { uploadMission as POST };
