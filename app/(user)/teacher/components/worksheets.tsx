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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { WorksheetType } from "@prisma/client";

type WorkSheetFormProps = {
  register: UseFormRegister<MissionFormValues>;
  control: Control<MissionFormValues>;
  errors: FieldErrors<MissionFormValues>;
  setValue: UseFormSetValue<MissionFormValues>;
  getValues: UseFormGetValues<MissionFormValues>;
  classNames?: string;
};

type MovieCheck = boolean;
type ArrCheckType = <T>(proc: (arr: T[]) => T[]) => (prev: T[]) => T[];

const updateArray: ArrCheckType = (proc) => {
  return (prev) => {
    const current = [...prev];
    return proc(current);
  };
};

const WorkSheetForm: React.FC<WorkSheetFormProps> = ({
  classNames,
  register,
  control,
  errors,
  setValue,
  getValues,
}) => {
  const [movieCheck, setMovieCheck] = useState<MovieCheck[]>([]);
  const [worksheetTypes, setWorksheetTypes] = useState<WorksheetType[]>([]);
  const { remove, append, fields } = useFieldArray({
    name: "worksheets",
    control,
  });
  return (
    <Card className={cn(classNames)}>
      <CardHeader>
        <CardTitle>콘텐츠</CardTitle>
        <CardDescription>
          학생이 원하는 콘텐츠를 입력하세요. 콘텐츠 설명에 대한 내용을 입력하지
          않으면 파일 명으로 대체됩니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col space-y-4'>
          {fields.map((field, index) => (
            <div key={field.id} className='flex flex-col space-y-2'>
              <Label className='font-bold ml-1'>업로드{` ${index + 1}`}</Label>
              <div className='flex space-x-4 items-center'>
                <Select
                  {...(register(`worksheets.${index}.worksheet.type`),
                  {
                    onValueChange: (value) => {
                      setValue(
                        `worksheets.${index}.worksheet.type`,
                        value as WorksheetType
                      );
                      setWorksheetTypes((prev) => {
                        return updateArray<WorksheetType>((current) => {
                          current[index] = value as WorksheetType;
                          return current;
                        })(prev);
                      });
                    },
                  })}
                >
                  <SelectTrigger className='min-w-12 max-w-[80px]'>
                    <SelectValue>
                      {!worksheetTypes[index]
                        ? "타입"
                        : worksheetTypes[index] === WorksheetType.HOMEWORK
                        ? "과제"
                        : "수업"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>타입</SelectLabel>
                      <SelectItem value={WorksheetType.HOMEWORK}>
                        과제
                      </SelectItem>
                      <SelectItem value={WorksheetType.CLASSWORK}>
                        수업
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Input
                  className='min-w-12 max-w-[64px]'
                  placeholder='코드'
                  {...register(
                    `worksheets.${index}.worksheet.fileCode` as const
                  )}
                />

                <Input
                  className=''
                  placeholder='콘텐츠 대한 설명이나 파일 이름'
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
                    // pdf파일, 이미지 파일, 동영상 파일
                    accept='.pdf, .jpg, .png'
                    className='hidden'
                    {...register(
                      `worksheets.${index}.worksheet.file` as const,
                      {
                        onChange: (e) => {
                          const file = e.target.files?.[0];
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
                    시험지
                  </span>
                </Label>
                <Label className='w-24 h-10 flex items-center justify-center hover:bg-gray-200 rounded-md border border-gray-300  px-3 py-1 cursor-pointer'>
                  <Input
                    type='file'
                    // 동영상 파일
                    accept='.mp4'
                    className='hidden'
                    {...register(
                      `worksheets.${index}.worksheet.video` as const,
                      {
                        onChange: (e) => {
                          const movieFile = e.target.files?.[0];
                          if (movieFile) {
                            setMovieCheck((prev) => {
                              return updateArray<MovieCheck>((current) => {
                                current[index] = true;
                                return current;
                              })(prev);
                            });
                          } else {
                            setMovieCheck((prev) => {
                              return updateArray<MovieCheck>((current) => {
                                current[index] = false;
                                return current;
                              })(prev);
                            });
                          }
                        },
                      }
                    )}
                  />
                  <span className='overflow-hidden overflow-ellipsis whitespace-nowrap'>
                    {movieCheck[index] ? "동영상" : "영상없음"}
                  </span>
                </Label>
                <div className='flex'>
                  <PlusCircleIcon
                    onClick={(e) => {
                      e.preventDefault();
                      append({
                        worksheet: {
                          fileCode: "",
                          fileName: "",
                          file: null,
                          type: WorksheetType.HOMEWORK,
                          video: null,
                        },
                      });
                      setMovieCheck((prev) => {
                        return updateArray<MovieCheck>((current) => {
                          current.splice(index + 1, 0, false);
                          return current;
                        })(prev);
                      });
                      setWorksheetTypes((prev) => {
                        return updateArray<WorksheetType>((current) => {
                          current.splice(index + 1, 0);
                          return current;
                        })(prev);
                      });
                    }}
                    className=' h-8 w-8 hover:text-gray-500 transition-colors'
                  />
                  <MinusCircleIcon
                    onClick={(e) => {
                      e.preventDefault();
                      remove(index);
                      setMovieCheck((prev) => {
                        return updateArray<MovieCheck>((current) => {
                          current.splice(index, 1);
                          return current;
                        })(prev);
                      });
                      setWorksheetTypes((prev) => {
                        return updateArray<WorksheetType>((current) => {
                          current.splice(index, 1);
                          return current;
                        })(prev);
                      });
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
              append({
                worksheet: {
                  fileCode: "",
                  fileName: "",
                  file: null,
                  type: WorksheetType.HOMEWORK,
                  video: null,
                },
              });

              setMovieCheck((prev) => {
                return updateArray<MovieCheck>((current) => {
                  current.push(false);
                  return current;
                })(prev);
              });
              setWorksheetTypes((prev) => {
                return updateArray<WorksheetType>((current) => {
                  current.push();
                  return current;
                })(prev);
              });
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
