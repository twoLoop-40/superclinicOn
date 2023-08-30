import { authOptions } from "@api/auth/[...nextauth]/route";
import { prisma } from "@lib/prisma";
import { SessionUser } from "@lib/types";
import { getServerSession } from "next-auth";
import StudentsTable from "./studentsTable";
import { StudentTableColumn, columns } from "./columns";
import combinePropertyExtractors from "@lib/combineExtractors";

const extractStudentDetails = combinePropertyExtractors([
  ({ user }) => ({ username: user.username }),
  ({ user }) => ({ email: user.email }),
  ({ matacode }) => ({ matacode }),
  ({ phone }) => ({ phone }),
  ({ parentPhone }) => ({ parentPhone }),
]);

const getStudents = async ({ teacherId }: { teacherId: number }) => {
  "use server";
  const studentTeachers = await prisma.studentTeacher.findMany({
    where: {
      teacherId,
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

const getTeacherId = async ({ userId }: { userId: number }) => {
  "use server";
  try {
    const teacher = await prisma.teacher.findUnique({
      where: {
        userId,
      },
    });
    const result = teacher
      ? { ok: true, teacherId: teacher.id }
      : { ok: false, teacherId: null, error: "Teacher not found" };
    return result;
  } catch (err) {
    return { ok: false, teacherId: null, error: err };
  }
};

const StudentsPage = async () => {
  const session = await getServerSession(authOptions);
  const { email, id, role, username } = session?.user as SessionUser;
  const { teacherId, ok, error } = await getTeacherId({ userId: Number(id) });

  if (ok && teacherId) {
    const students = await getStudents({ teacherId });
    const studentTableObject = students.map((student) => {
      return extractStudentDetails(student);
    }) as StudentTableColumn[];

    return (
      <div className='flex flex-col px-4 py-2 container'>
        <StudentsTable
          teacherId={teacherId}
          data={studentTableObject}
          columns={columns}
        />
      </div>
    );
  } else {
    return (
      <div className='flex flex-col px-4 py-2 container'>
        <h1 className='text-2xl font-bold'>Students</h1>
        <p className='text-red-500'>{error as string}</p>
      </div>
    );
  }
};

export default StudentsPage;
