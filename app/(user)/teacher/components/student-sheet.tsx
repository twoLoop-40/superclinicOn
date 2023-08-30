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
    const { username, email, password } = data;
    await createStudentByTeacher({ teacherId, username, email, password });
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
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username'>이름 :</Label>
              <Input
                className='col-span-3'
                type='text'
                {...register("username", { required: true })}
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='email'>이메일 :</Label>
              <Input
                className='col-span-3'
                type='email'
                {...register("email", { required: true })}
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='email'>패스워드 :</Label>
              <Input
                className='col-span-3'
                type='password'
                {...register("password", { required: true })}
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
