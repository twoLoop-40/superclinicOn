"use server";

import { User } from "@prisma/client";
import { redirect } from "next/navigation";

export const loginClient = async (credential: User) => {
  console.log({ credential });
  redirect("/");
};
