"use client";

import { useForm } from "react-hook-form";
import { Button } from "@components/ui/button";
import { DateRange } from "react-day-picker";
import DateRangePicker from "./date-range-picker";
import GoalsForm from "./goals";
import WorkSheetForm from "./worksheets";

type Worksheet = {
  fileCode: string;
  fileName: string;
  file: File | null;
};

export type MissionFormValues = {
  goals: { goal: string }[];
  worksheets: { worksheet: Worksheet }[];
  dateRange: DateRange | undefined;
};

const MissionForm = () => {
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

  const onMissionSubmit = (data: MissionFormValues) => {
    const { goals, dateRange, worksheets } = data;
    console.log({ goals, dateRange, worksheets });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onMissionSubmit)}
        className='flex flex-col space-y-4 items-center'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 space-y-4 gap-4 justify-center items-baseline'>
          <GoalsForm register={register} control={control} errors={errors} />
          <DateRangePicker control={control} />
          <WorkSheetForm
            register={register}
            control={control}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
          />
        </div>

        <Button variant='outline' size='default' className='w-32'>
          제출
        </Button>
      </form>
    </div>
  );
};

export default MissionForm;
