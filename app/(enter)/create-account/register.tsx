"use client";

import { registerClient } from "@actions/registerClient";
import ShowError from "@components/showError";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Role, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type RegitsterItems = {
  username: string;
  email: string;
  password: string;
};
type RegisterFormProps = {
  role: string;
};
const RegisterForm = ({ role }: RegisterFormProps) => {
  const router = useRouter();
  const {
    reset,
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty },
  } = useForm<User>();

  const onRegisterFormSubmit = async (data: User) => {
    data.role = role as Role;
    const response = await registerClient(data);
    const { ok, error } = response;
    if (!ok) {
      console.log(error);
      reset();
      setError("root", { message: "이미 존재하는 이메일입니다." });
    } else {
      reset();
      router.push("/login");
    }
  };
  return (
    <div>
      <form
        className='space-y-12 w-full sm:w-[400px]'
        onSubmit={handleSubmit(onRegisterFormSubmit)}
      >
        <div className='grid w-full items-center gap-1.5'>
          <Label className='font-bold' htmlFor='email'>
            Email
          </Label>
          <Input
            className='w-full'
            {...register("email", { required: "*required" })}
            type='email'
          />
          {errors && errors.email?.message && (
            <ShowError message={errors.email.message} />
          )}
        </div>
        <div className='grid w-full items-center gap-1.5'>
          <Label className='font-bold' htmlFor='password'>
            Password
          </Label>
          <Input
            className='w-full'
            {...register("password", { required: "*required" })}
            type='password'
          />
          {errors && errors?.password?.message && (
            <ShowError message={errors?.password?.message} />
          )}
        </div>
        <div className='grid w-full items-center gap-1.5'>
          <Label className='font-bold' htmlFor='username'>
            Name
          </Label>
          <Input
            className='w-full'
            {...register("username", { required: "*required" })}
            type='text'
          />
          {errors && errors.username?.message && (
            <ShowError message={errors.username.message} />
          )}
        </div>
        {!isDirty && errors && errors.root?.message && (
          <ShowError message={errors.root?.message} />
        )}
        <div className='w-full'>
          <Button className='bg-indigo-500 w-full' size='lg'>
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
