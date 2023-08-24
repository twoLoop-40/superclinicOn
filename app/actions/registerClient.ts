"use server";

import { executeFromCondition } from "@lib/excuteFromCondition";
import { prisma } from "@lib/prisma";
import { SessionUser } from "@lib/types";
import { Role, User } from "@prisma/client";
import { hash } from "bcrypt";

export type ResponseRegister<T> = {
  ok: boolean;
  error?: string;
  user?: T;
};

const createUser = async ({
  email,
  password,
  username,
  role,
}: Omit<SessionUser, "id"> & { password: string }) => {
  const hashedPassword = await hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username,
      role,
    },
  });

  const makeUserByRole = executeFromCondition(role === Role.STUDENT)(
    async () => {
      await prisma.student.create({
        data: {
          userId: user.id,
        },
      });
    },
    async () => {
      await prisma.teacher.create({
        data: {
          userId: user.id,
        },
      });
    }
  );
  await makeUserByRole();
  return user;
};

export const registerClient = async (
  credential: User
): Promise<ResponseRegister<User>> => {
  const { email, username, password, role } = credential;
  const isUserExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  const proceduresToRun = executeFromCondition(Boolean(isUserExists))(
    async () => {
      return {
        ok: false,
        error: "user already exists",
      };
    },
    async () => {
      const user = await createUser({ email, password, username, role });
      return {
        ok: true,
        user,
      };
    }
  );
  return proceduresToRun();
};
