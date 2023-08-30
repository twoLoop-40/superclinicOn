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
};

const createStudentByTeacher = ({
  email,
  username,
  password,
  teacherId,
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
        },
      });
      return student;
    },
    async (student) => {
      const studentTeacher = await prisma.studentTeacher.create({
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
