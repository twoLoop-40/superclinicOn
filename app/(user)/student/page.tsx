import { authOptions } from "@api/auth/[...nextauth]/route";
import { SessionUser } from "@lib/types";
import { getServerSession } from "next-auth";

const StudentPage = async () => {
  const session = await getServerSession(authOptions);
  const { email, id, role, username } = session?.user as SessionUser;

  return <div>{username}님 안녕하세요</div>;
};

export default StudentPage;
