"use client";

import createStudentByTeacher from "@actions/createStudentByTeacher";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import { useForm } from "react-hook-form";

type CreateStudentFormType = {
  username: string;
  email: string;
  password: string;
  phone?: string;
  parentPhone?: string;
  mataCode?: string;
};

type Predicate = (arg: any) => boolean;

const allTrue =
  (...predicates: Predicate[]) =>
  (arg: any) =>
    predicates.every((predicate) => predicate(arg));

type StudentSheetProps = {
  teacherId: number;
};

const StudentSheet = ({ teacherId }: StudentSheetProps) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStudentFormType>();
  const onStudentSubmit = async (data: CreateStudentFormType) => {
    const { username, email, password, parentPhone, phone, mataCode } = data;
    await createStudentByTeacher({
      teacherId,
      username,
      email,
      password,
      parentPhone,
      phone,
      mataCode,
    });
    reset();
  };
  return (
    <Sheet>
      <SheetTrigger className='hover:bg-slate-100 border ml-auto w-28 h-10 rounded-md'>
        학생 가입
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>신규 학생 가입</SheetTitle>
          <SheetDescription>
            학생 정보를 아래 서식에 맞게 입력하시오
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onStudentSubmit)}>
          <div className='grid gap-4 py-4'>
            <div className='flex flex-col gap-2'>
              <Label className='font-bold' htmlFor='username'>
                이름
              </Label>
              <Input
                className=' ml-auto'
                type='text'
                {...register("username", { required: true })}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label className='font-bold' htmlFor='email'>
                이메일
              </Label>
              <Input
                className=' ml-auto'
                type='email'
                {...register("email", { required: true })}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label className='font-bold' htmlFor='email'>
                패스워드
              </Label>
              <Input
                className=''
                type='password'
                {...register("password", { required: true })}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label className='font-bold' htmlFor='mataCode'>
                마타코드
              </Label>
              <Input className='' type='text' {...register("mataCode")} />
            </div>
            <div className='flex flex-col gap-2'>
              <Label className='font-bold' htmlFor='email'>
                전화번호
              </Label>
              <Input
                className=''
                type='text'
                {...register("phone")}
                placeholder='번호만 적어주세요...'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label className='font-bold' htmlFor='email'>
                부모님번호
              </Label>
              <Input
                className=''
                type='text'
                {...register("parentPhone")}
                placeholder='번호만 적어주세요...'
              />
            </div>
          </div>

          <Button
            className='flex ml-auto'
            type='submit'
            variant='default'
            size='lg'
          >
            저장
          </Button>
        </form>
        <SheetClose />
      </SheetContent>
    </Sheet>
  );
};

export default StudentSheet;
