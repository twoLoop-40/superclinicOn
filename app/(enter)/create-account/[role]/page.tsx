import Link from "next/link";
import RegisterForm from "../register";
import { Role } from "@prisma/client";

const RegisterPage = ({ params }: { params: { role: string } }) => {
  const roleString = ([teacher, student]: [string, string]) => {
    return (role: string) => {
      if (role === Role.TEACHER) {
        return teacher;
      } else {
        return student;
      }
    };
  };

  return (
    <div className='sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12'>
      <h1 className='font-semibold text-2xl'>
        {roleString(["선생님", "학생"])(params.role)} 회원가입
      </h1>
      <RegisterForm role={params.role} />
      <p className='text-center'>
        계정이 있나요? &rarr;{" "}
        <Link className='text-indigo-500 hover:underline' href='/login'>
          로그인
        </Link>{" "}
      </p>
    </div>
  );
};

export default RegisterPage;
