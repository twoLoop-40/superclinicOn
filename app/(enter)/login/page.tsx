import Link from "next/link";
import LoginForm from "./loginForm";

const LoginPage = () => {
  return (
    <div className='sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12'>
      <h1 className='font-semibold text-2xl'>로그인</h1>
      <LoginForm />
      <p className=' flex justify-between'>
        <span>회원 가입 &rarr;</span>
        <Link
          className='text-indigo-500 hover:underline'
          href='/create-account/TEACHER'
        >
          선생님 회원
        </Link>
        <Link
          className='text-indigo-500 hover:underline'
          href='/create-account/STUDENT'
        >
          학생 회원
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
