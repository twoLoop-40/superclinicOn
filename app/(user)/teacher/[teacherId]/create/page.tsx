import MissionForm from "@(user)/teacher/components/mission-form";
import { prisma } from "@lib/prisma";
import { User } from "@prisma/client";

const findUsers = async (emails: string[]) => {
  "use server";
  const users = await Promise.all(
    emails.map((email) => {
      try {
        return prisma.user.findUnique({
          where: {
            email,
          },
        });
      } catch (err) {
        console.error("Error finding user", err);
        return null;
      }
    })
  );
  const filteredUsers = users.filter((user) => user !== null);
  return filteredUsers as User[];
};

// missionForm Type
type MissionFormProps = {
  users?: User[];
};

const GoMissionForm = ({ users }: MissionFormProps) => {
  return (
    <div className='overflow-hidden rounded-lg border bg-background shadow p-4'>
      <MissionForm users={users} />
    </div>
  );
};

const CreateMissionPage = async ({
  params,
  searchParams,
}: {
  params: { teacherId: string };
  searchParams: { studentEmails: string };
}) => {
  const { studentEmails } = searchParams;
  const missionUsers = studentEmails
    ? await findUsers(JSON.parse(studentEmails) as string[])
    : [];
  return <GoMissionForm users={missionUsers} />;
};

export default CreateMissionPage;
