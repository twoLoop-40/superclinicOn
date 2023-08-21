"use client";

import { loginClient } from "@actions/loginClient";
import ShowError from "@components/showError";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const onLoginFormSubmit = async (data: User) => {
    const response = await loginClient(data);
    console.log({ response });
    reset();
  };
  return (
    <div>
      <form
        className='space-y-12 w-full sm:w-[400px]'
        onSubmit={handleSubmit(onLoginFormSubmit)}
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

        <div className='w-full'>
          <Button className='bg-indigo-500 w-full' size='lg'>
            로그인
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
