import MissionForm from "@(user)/teacher/components/mission-form";

const CreateMissionPage = async ({
  params,
  searchParams,
}: {
  params: { teacherId: string };
  searchParams: { studentEmails: string };
}) => {
  const { studentEmails } = searchParams;
  if (studentEmails) {
    const studentEmailsArray = JSON.parse(studentEmails);
    console.log(studentEmailsArray);
  }
  return (
    <div className='overflow-hidden rounded-lg border bg-background shadow p-4'>
      <MissionForm />
    </div>
  );
};

export default CreateMissionPage;
