"use client";

import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import { MissionFormValues } from "./mission-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { cn } from "@lib/utils";

type GoalsFormProps = {
  register: UseFormRegister<MissionFormValues>;
  control: Control<MissionFormValues>;
  errors: FieldErrors<MissionFormValues>;
};
const GoalsForm = ({ register, control, errors }: GoalsFormProps) => {
  const { remove, append, fields } = useFieldArray({
    name: "goals",
    control,
  });

  return (
    <Card className='max-w-lg'>
      <CardHeader>
        <CardTitle>미션 목표 설정</CardTitle>
        <CardDescription>
          이번 미션에 해당하는 여러가지 목표를 설정하세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col space-y-4'>
          {fields.map((field, index) => {
            return (
              <div key={field.id} className='flex flex-col space-y-2'>
                <Label className='font-bold ml-1'>목표{` ${index + 1}`}</Label>
                <div className='flex space-x-2 items-center'>
                  <Input
                    {...register(`goals.${index}.goal` as const, {
                      required: true,
                    })}
                  />
                  <PlusCircleIcon
                    onClick={(e) => {
                      e.preventDefault();
                      append({ goal: "" });
                    }}
                    className='h-8 w-8 hover:text-gray-500 transition-colors'
                  />
                  <MinusCircleIcon
                    onClick={(e) => {
                      e.preventDefault();
                      remove(index);
                    }}
                    className='h-8 w-8 hover:text-gray-500 transition-colors'
                  />
                </div>
              </div>
            );
          })}
          {errors.goals && (
            <p className='text-red-500'>
              목표를 입력하거나 빈 목표를 지워주세요
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className={cn("flex space-x-2", fields.length && "hidden")}>
          <PlusCircleIcon
            onClick={(e) => {
              e.preventDefault();
              append({ goal: "" });
            }}
            className='h-6 w-6 hover:text-gray-500 transition-colors'
          />
          <MinusCircleIcon
            onClick={(e) => {
              e.preventDefault();
              remove(fields.length - 1);
            }}
            className='h-6 w-6 hover:text-gray-500 transition-colors'
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default GoalsForm;
