// 선생님 메인 페이지 server-component

import { authOptions } from "@api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { SessionUser } from "@lib/types";
import { prisma } from "@lib/prisma";

const getMissions = async ({ id }: { id: string }) => {
  "use server";

  try {
    const userTeacherMissions = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        teacher: {
          include: {
            missions: true,
          },
        },
      },
    });
    return { ok: true, missions: userTeacherMissions?.teacher?.missions };
  } catch (error) {
    console.log(error);
    return { ok: false, error: "미션을 불러오는데 실패했습니다." };
  }
};

const TeacherPage = async () => {
  const session = await getServerSession(authOptions);
  const { email, id, role, username } = session?.user as SessionUser;
  const response = await getMissions({ id });
  const { ok, missions, error } = response;
  // console.log({ missions });

  return (
    <div className='flex flex-col py-4'>
      <h1>선생님 메인 페이지</h1>
      <div>Missions: {ok ? missions?.length : error}</div>
    </div>
  );
};

export default TeacherPage;
