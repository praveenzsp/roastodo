"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
      Popover,
      PopoverContent,
      PopoverTrigger,
} from "@/components/ui/popover";
import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

export function DatePickerWithPresets({
      onDateChange,
}: {
      onDateChange: (date: Date | null) => void;
}) {
      const [date, setDate] = React.useState<Date>();
      const [open, setOpen] = React.useState(false);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to start of day

      useEffect(() => {
            onDateChange(date ?? null);
      }, [date, onDateChange]);

      return (
            <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                        <Button
                              variant={"outline"}
                              className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                              )}
                        >
                              <CalendarIcon />
                              {date ? (
                                    format(date, "PPP")
                              ) : (
                                    <span>Pick a date</span>
                              )}
                        </Button>
                  </PopoverTrigger>
                  <PopoverContent
                        align="start"
                        className="flex w-auto flex-col space-y-2 p-2"
                  >
                        <Select
                              onValueChange={(value) => {
                                    setDate(addDays(today, parseInt(value)));
                                    setOpen(false);
                              }}
                        >
                              <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent position="popper">
                                    <SelectItem value="0">Today</SelectItem>
                                    <SelectItem value="1">Tomorrow</SelectItem>
                                    <SelectItem value="3">In 3 days</SelectItem>
                                    <SelectItem value="7">In a week</SelectItem>
                              </SelectContent>
                        </Select>
                        <div className="rounded-md border">
                              <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={(date) => {
                                          setDate(date);
                                          setOpen(false);
                                    }}
                                    fromDate={today}
                              />
                        </div>
                  </PopoverContent>
            </Popover>
      );
}
