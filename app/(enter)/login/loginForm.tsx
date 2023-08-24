"use client";

import ShowError from "@components/showError";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { optionalExcute } from "@lib/excuteFromCondition";
import { User } from "@prisma/client";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

type ValidKeys = "email" | "password";

const LoginForm = () => {
  const router = useRouter();
  const {
    reset,
    setError,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<User>({ mode: "onChange" });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const onLoginFormSubmit = async (data: User) => {
    const { email, password } = data;
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });
    const executer = optionalExcute(
      () => {
        reset();
        setError("root", { message: "로그인에 실패했습니다." });
      },
      () => router.push(callbackUrl)
    );
    executer(Boolean(res?.error))();
  };

  console.log(isDirty);
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
          {!isDirty && errors && errors?.password?.message && (
            <ShowError message={errors?.password?.message} />
          )}
        </div>
        {!isDirty && errors && errors.root?.message && (
          <ShowError message={errors.root.message} />
        )}
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
