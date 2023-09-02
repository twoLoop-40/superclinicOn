import { Control, Controller } from "react-hook-form";
import { MissionFormValues } from "./mission-form";
import { addDays, format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { Button } from "@components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@components/ui/calendar";

type DateRangePickerProps = {
  control: Control<MissionFormValues>;
};

const DateRangePicker = ({ control }: DateRangePickerProps) => {
  return (
    <Controller
      name='dateRange'
      control={control}
      defaultValue={{
        from: new Date(),
        to: addDays(new Date(), 7),
      }}
      render={({ field }) => (
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                size='default'
                className='w-[300px] justify-start text-left font-normal'
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {field.value?.from ? (
                  field.value.to ? (
                    <>
                      {format(field.value.from, "LLL dd, y")} -{" "}
                      {format(field.value.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(field.value.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                initialFocus
                mode='range'
                defaultMonth={field.value?.from}
                selected={field.value}
                onSelect={(selectedDate) => {
                  field.onChange(selectedDate);
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    />
  );
};

export default DateRangePicker;
