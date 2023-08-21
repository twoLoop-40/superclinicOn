import Link from "next/link";
import RegisterForm from "./register";

const RegisterPage = () => {
  return (
    <div className='sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12'>
      <h1 className='font-semibold text-2xl'>새 계정 만들기</h1>
      <RegisterForm />
      <p className='text-center'>
        계정이 있나요?{" "}
        <Link className='text-indigo-500 hover:underline' href='/login'>
          로그인
        </Link>{" "}
      </p>
    </div>
  );
};

export default RegisterPage;
