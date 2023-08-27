// 선생님 메인 페이지 server-component

import { authOptions } from "@api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import { SessionUser } from "@lib/types";

const TeacherPage = async () => {
  const session = await getServerSession(authOptions);
  const { email, id, role, username } = session?.user as SessionUser;

  return (
    <div className='flex flex-col w-full items-center p-4'>
      <div>학생 소식</div>
      <div>수업 소식</div>
    </div>
  );
};

export default TeacherPage;
