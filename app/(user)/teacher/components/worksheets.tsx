"use client";

import React, { useState } from "react";
import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
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
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";

type WorkSheetFormProps = {
  register: UseFormRegister<MissionFormValues>;
  control: Control<MissionFormValues>;
  errors: FieldErrors<MissionFormValues>;
  setValue: UseFormSetValue<MissionFormValues>;
  getValues: UseFormGetValues<MissionFormValues>;
};

const WorkSheetForm: React.FC<WorkSheetFormProps> = ({
  register,
  control,
  errors,
  setValue,
  getValues,
}) => {
  const { remove, append, fields } = useFieldArray({
    name: "worksheets",
    control,
  });

  return (
    <Card className='max-w-lg'>
      <CardHeader>
        <CardTitle>파일 업로드</CardTitle>
        <CardDescription>
          이번 미션에 해당하는 PDF 파일과 파일 이름 또는 코드를 업로드하세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col space-y-4'>
          {fields.map((field, index) => (
            <div key={field.id} className='flex flex-col space-y-2'>
              <Label className='font-bold ml-1'>업로드{` ${index + 1}`}</Label>
              <div className='flex space-x-4 items-center'>
                <Input
                  className='min-w-12 max-w-[64px]'
                  placeholder='타입'
                  {...register(
                    `worksheets.${index}.worksheet.fileCode` as const
                  )}
                />
                <Input
                  className='min-w-12 max-w-[64px]'
                  placeholder='코드'
                  {...register(
                    `worksheets.${index}.worksheet.fileCode` as const
                  )}
                />

                <Input
                  className=''
                  placeholder='파일이름'
                  {...register(
                    `worksheets.${index}.worksheet.fileName` as const,
                    {
                      required: true,
                    }
                  )}
                />
                <Label className='w-24 h-10 flex items-center justify-center hover:bg-gray-200 rounded-md border border-gray-300  px-3 py-1 cursor-pointer'>
                  <Input
                    type='file'
                    accept='application/pdf'
                    className='hidden'
                    {...register(
                      `worksheets.${index}.worksheet.file` as const,
                      {
                        onChange: (e) => {
                          const file = e.target.files?.[0];
                          const currentValues = getValues("worksheets");
                          const currentFileName =
                            currentValues[index].worksheet.fileName;
                          if (file) {
                            setValue(
                              `worksheets.${index}.worksheet.fileName`,
                              `${file.name}`
                            );
                          }
                        },
                      }
                    )}
                  />
                  <span className='overflow-hidden overflow-ellipsis whitespace-nowrap'>
                    업로드
                  </span>
                </Label>
                <div className='flex'>
                  <PlusCircleIcon
                    onClick={(e) => {
                      e.preventDefault();
                      append({
                        worksheet: { fileCode: "", fileName: "", file: null },
                      });
                    }}
                    className=' h-8 w-8 hover:text-gray-500 transition-colors'
                  />
                  <MinusCircleIcon
                    onClick={(e) => {
                      e.preventDefault();
                      remove(index);
                    }}
                    className=' h-8 w-8 hover:text-gray-500 transition-colors'
                  />
                </div>
              </div>
            </div>
          ))}
          {errors.worksheets && (
            <p className='text-red-500'>
              파일 이름과 워크시트를 업로드하거나 빈 워크시트를 지워주세요.
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className={cn("flex space-x-2", fields.length && "hidden")}>
          <PlusCircleIcon
            onClick={(e) => {
              e.preventDefault();
              append({ worksheet: { fileCode: "", fileName: "", file: null } });
            }}
            className='h-8 w-8 hover:text-gray-500 transition-colors'
          />
          <MinusCircleIcon
            onClick={(e) => {
              e.preventDefault();
              remove(fields.length - 1);
            }}
            className='h-8 w-8 hover:text-gray-500 transition-colors'
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default WorkSheetForm;
