"use client";

import { useForm } from "react-hook-form";
import { Button } from "@components/ui/button";
import { DateRange } from "react-day-picker";
import DateRangePicker from "./date-range-picker";
import GoalsForm from "./goals";
import WorkSheetForm from "./worksheets";
import { User, WorksheetType } from "@prisma/client";

export type Worksheet = {
  type: WorksheetType;
  fileCode: string;
  fileName: string;
  file: File | null;
  video: File | null;
};

export type MissionFormValues = {
  goals: { goal: string }[];
  worksheets: { worksheet: Worksheet }[];
  dateRange: DateRange | undefined;
  title: string;
  description: string;
};

type MissionFormProps = {
  users?: User[];
};

type FormProcess = (formdata: FormData) => void;
type FormDataRoute = {
  formdata: FormData;
  apiRoute: string;
};
const uploadFormData = <T extends unknown>(formHandler: FormProcess) => {
  return async ({ formdata, apiRoute }: FormDataRoute) => {
    formHandler(formdata);
    const response = await fetch(apiRoute, {
      method: "POST",
      body: formdata,
    });
    const data = await response.json();
    return data as T;
  };
};

const MissionForm = ({ users }: MissionFormProps) => {
  const {
    getValues,
    setValue,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MissionFormValues>({
    defaultValues: {
      goals: [{ goal: "" }],
      worksheets: [{ worksheet: { fileCode: "", fileName: "", file: null } }],
    },
  });

  const onMissionSubmit = async (data: MissionFormValues) => {
    const { goals, worksheets, dateRange, title, description } = data;
    const missionUpload = uploadFormData<{ missionId: number }>((formdata) => {
      formdata.append("title", title);
      formdata.append("description", description);
      formdata.append("startDate", dateRange?.from?.toISOString() || "");
      formdata.append("endDate", dateRange?.to?.toISOString() || "");
      formdata.append("goals", JSON.stringify(goals));
    });

    const { missionId } = await missionUpload({
      formdata: new FormData(),
      apiRoute: "/api/missionUpload",
    });

    try {
      const worksheetIds = await Promise.all(
        worksheets
          .map(({ worksheet }) => {
            return uploadFormData<{ worksheetId: number }>((formdata) => {
              formdata.append("file", worksheet.file as File);
              formdata.append("video", worksheet.video as File);
              formdata.append("fileCode", worksheet.fileCode);
              formdata.append("fileName", worksheet.fileName);
              formdata.append("worksheetType", worksheet.type);
              formdata.append("missionId", missionId.toString());
            });
          })
          .map(async (worksheetUpload) => {
            await worksheetUpload({
              formdata: new FormData(),
              apiRoute: "/api/upload-worksheet",
            });
          })
      );
      console.log({ worksheetIds });
    } catch (error) {
      console.log(error);
    }
  };

  const onCreateTitleAndDescription = (data: MissionFormValues) => {
    console.log({ onCreateTitleAndDescription: data });
  };

  return (
    <div className='flex flex-col items-center space-y-6'>
      <div className=' w-full grid grid-cols-2 items-center justify-items-center gap-6'>
        <h1 className='text-3xl font-bold text-center flex items-center'>
          미션 만들기
        </h1>
        {users?.length !== 0 && (
          <div className='flex space-x-2 items-center'>
            <h1 className='text-lg font-bold'>미션 참여자 : </h1>
            {users?.map((user: User) => (
              <span key={user.id}>{user?.username}</span>
            ))}
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit(onMissionSubmit)}
        className='flex flex-col space-y-4 items-center'
      >
        <div className='grid grid-cols-1 gap-4 justify-center items-baseline md:grid-cols-2 '>
          <DateRangePicker control={control} />
          <GoalsForm register={register} control={control} errors={errors} />
          <WorkSheetForm
            classNames='md:col-span-2 flex flex-col'
            register={register}
            control={control}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
          />
        </div>
        <div className='w-full flex justify-between space-x-2'>
          <Button variant='outline' size='default' className='w-32'>
            저장
          </Button>
          <Button
            onClick={handleSubmit(onCreateTitleAndDescription)}
            variant='outline'
            size='default'
            className='w-52 flex items-center'
          >
            미션 타이틀과 설명 만들기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MissionForm;
