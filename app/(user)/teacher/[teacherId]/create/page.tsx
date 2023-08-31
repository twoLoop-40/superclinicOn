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
    <div>
      <h1>Create Mission Page</h1>
    </div>
  );
};

export default CreateMissionPage;
