// 선생님 메인 페이지 server-component

import { authOptions } from "@api/auth/[...nextauth]/route";
import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";

type SessionUser = {
  id: number;
  email: string;
  username: string;
  role: Role;
};

const TeacherPage = async () => {
  const session = await getServerSession(authOptions);
  const { email, id, role, username } = session?.user as SessionUser;

  return <div>{username}님 안녕하세요</div>;
};

export default TeacherPage;
