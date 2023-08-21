"use server";

import { User } from "@prisma/client";

export const registerClient = async (credential: User) => {
  console.log({ credential });
  return credential;
};
