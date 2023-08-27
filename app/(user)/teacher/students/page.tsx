import { authOptions } from "@api/auth/[...nextauth]/route";
import { prisma } from "@lib/prisma";
import { SessionUser } from "@lib/types";
import { getServerSession } from "next-auth";
import StudentsTable from "./studentsTable";
import { StudentTableColumn } from "./columns";
import combinePropertyExtractors from "@lib/combineExtractors";

const extractStudentDetails = combinePropertyExtractors([
  ({ user }) => ({ username: user.username }),
  ({ user }) => ({ email: user.email }),
  ({ matacode }) => ({ matacode }),
  ({ phone }) => ({ phone }),
  ({ parentPhone }) => ({ parentPhone }),
]);

const StudentsPage = async () => {
  const session = await getServerSession(authOptions);
  const { email, id, role, username } = session?.user as SessionUser;
  const getStudents = async ({ id }: { id: number }) => {
    "use server";
    const studentTeachers = await prisma.studentTeacher.findMany({
      where: {
        teacherId: id,
      },
      include: {
        student: {
          include: {
            user: true,
          },
        },
      },
    });
    return studentTeachers.map((student) => student.student);
  };
  const students = await getStudents({ id: Number(id) });
  const studentTableObject = students.map((student) => {
    return extractStudentDetails(student);
  }) as StudentTableColumn[];

  return (
    <div className='flex flex-col px-4 py-2'>
      <h1>Students Page</h1>
      <p>
        Num of {username} students: {students.length}
      </p>
      <StudentsTable students={students} />
    </div>
  );
};

export default StudentsPage;
