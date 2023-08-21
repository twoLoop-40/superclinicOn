import { authOptions } from "@api/auth/[...nextauth]/route";
import { User } from "@components/user";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className=''>
      <h1 className=''>Welcome to Next.js!</h1>
      <div>Server Session</div>
      <pre>{JSON.stringify(session)}</pre>
      <div>Client Session</div>
      <User />
    </main>
  );
}
