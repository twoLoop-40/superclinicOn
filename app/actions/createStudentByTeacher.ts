"use server";
import { prisma } from "@lib/prisma";
import chainPrismaOps from "@lib/sequentialPrismaExecute";
import { Role } from "@prisma/client";
import { hash } from "bcrypt";
import { revalidatePath } from "next/cache";

type CredentialProps = {
  email: string;
  username: string;
  password: string;
  teacherId: number;
  phone?: string;
  parentPhone?: string;
  mataCode?: string;
};

const createStudentByTeacher = ({
  email,
  username,
  password,
  teacherId,
  phone,
  parentPhone,
  mataCode,
}: CredentialProps) => {
  const chain = chainPrismaOps(
    async () => {
      const hashedPassword = await hash(password, 12);
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          username,
          role: Role.STUDENT,
        },
      });
      return user;
    },
    async (user) => {
      const student = await prisma.student.create({
        data: {
          userId: user.id,
          phone: phone as string,
          parentPhone: parentPhone as string,
          mataCode: mataCode as string,
        },
      });
      return student;
    },
    async (student) => {
      await prisma.studentTeacher.create({
        data: {
          studentId: student.id,
          teacherId,
        },
      });
    }
  );
  chain();
  revalidatePath("/teacher/students");
};

export default createStudentByTeacher;
