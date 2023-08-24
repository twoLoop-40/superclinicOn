import { authOptions } from "@api/auth/[...nextauth]/route";
import { optionalExcute } from "@lib/excuteFromCondition";
import { Role, User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user as User;
  return optionalExcute(
    () => redirect("/student"),
    () => redirect("/teacher")
  )(user?.role === Role.STUDENT)();
}
