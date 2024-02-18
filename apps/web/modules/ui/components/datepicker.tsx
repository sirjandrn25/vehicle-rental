"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@ui/lib/utils";
import { format, setHours, setMinutes } from "date-fns";
import * as React from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DatePickerProps {
  value?: Date;
  onChange?: (date?: Date) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value ?? new Date());

  const handleChange = React.useCallback((date: Date) => {
    setDate(date);
    onChange?.(date);
  }, []);

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;

    try {
      const hours = Number.parseInt(value.split(":")[0] ?? "0", 10);
      const minutes = Number.parseInt(value.split(":")[1] ?? "0", 10);

      let newDate = setHours(date ?? new Date(), hours);
      newDate = setMinutes(newDate ?? new Date(), minutes);

      if (newDate.toString() !== "Invalid Date")
        return handleChange(new Date(newDate));
    } catch (error) {}
  };
  const timeValue = React.useMemo(() => {
    const hours = date?.getHours() ?? 0;
    const minutes = date?.getMinutes() ?? 0;
    const convertToTwoDigits = (value: number) => {
      if (value < 10) return `0${value}`;
      return `${value}`;
    };
    return `${convertToTwoDigits(hours)}:${convertToTwoDigits(minutes)}`;
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "min-w-[300px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPPPp") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(_, selected) => {
            handleChange(selected);
          }}
          initialFocus
        />
        <div className="w-full p-2">
          <Input value={timeValue} type="time" onChange={handleTimeChange} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
