import { authOptions } from "@api/auth/[...nextauth]/route";
import { SessionUser } from "@lib/types";
import { getServerSession } from "next-auth";
import MainNav from "./components/main-nav";
import UserNav from "./components/user-nav";

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  const { email, id, role, username } = session?.user as SessionUser;

  return (
    <div className='w-full flex flex-col'>
      <div className='border-b'>
        <div className='flex h-12 container'>
          <MainNav className='mx-4' />
          <div className='ml-auto flex items-center space-x-4'>
            <UserNav email={email} username={username} />
          </div>
        </div>
      </div>
      <div className='container relative'>{children}</div>
    </div>
  );
};

export default UserLayout;
