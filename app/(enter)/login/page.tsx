import Link from "next/link";
import LoginForm from "./loginForm";

const LoginPage = () => {
  return (
    <div className='sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12'>
      <h1 className='font-semibold text-2xl'>로그인</h1>
      <LoginForm />
      <p className='text-center'>
        계정이 없다면{" "}
        <Link
          className='text-indigo-500 hover:underline'
          href='/create-account'
        >
          새 계정 만들기
        </Link>{" "}
      </p>
    </div>
  );
};

export default LoginPage;
