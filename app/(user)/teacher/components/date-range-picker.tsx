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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

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
          <Card className='max-w-lg'>
            <CardHeader>
              <CardTitle>기간</CardTitle>
              <CardDescription>
                미션이 진행되는 기간을 정해 주세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </div>
      )}
    />
  );
};

export default DateRangePicker;
