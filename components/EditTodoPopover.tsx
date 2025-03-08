"use client";
import {
      Popover,
      PopoverContent,
      PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
// import { SquarePlus } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { DatePickerWithPresets } from "./DatePicker";
import { useState } from "react";
import { updateTodo } from "@/actions/todo";
import { toast } from 'react-toastify';

function EditTodoPopover({
      id,
      currentTitle,
      currentExpiryDate,
      userEmail,
}: {
      id: number;
      currentTitle: string;
      currentExpiryDate: Date;
      userEmail: string;
}) {
      const [open, setOpen] = useState(false);
      const [todo, setTodo] = useState(currentTitle);
      const [date, setDate] = useState<Date | null>(currentExpiryDate);

      const handleEditTodo = async () => {
            if (!todo || !date) {
                  toast.warning("Please fill in all fields");
                  return;
            }

            try {
                  const result = await updateTodo(id, userEmail, {
                        title: todo,
                        expiresAt: date,
                  });
                  
                  if (!result.success) {
                        toast.error(result.error || "Failed to update todo");
                        return;
                  }

                  toast.success("Todo updated successfully! 📝");
                  setOpen(false);
                  setTodo("");
                  setDate(null);
            } catch (error) {
                  console.error(error);
                  toast.error("An error occurred while updating the todo");
            }
      };

      return (
            <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                        <Button variant="ghost">Edit</Button>
                  </PopoverTrigger>
                  <PopoverContent className="">
                        <EditTodoForm
                              todo={todo}
                              setTodo={setTodo}
                              setDate={setDate}
                              onSubmit={handleEditTodo}
                              currentTitle={currentTitle}
                              currentExpiryDate={currentExpiryDate}
                        />
                  </PopoverContent>
            </Popover>
      );
}

export default EditTodoPopover;

function EditTodoForm({
      setTodo,
      setDate,
      onSubmit,
      currentTitle,
}:
{
      todo: string;
      setTodo: (todo: string) => void;
      setDate: (date: Date | null) => void;
      onSubmit: () => void;
      currentTitle: string;
      currentExpiryDate: Date;
}) {
      const handleDateChange = (date: Date | null) => {
            setDate(date);
      };

      return (
            <div className="grid gap-6">
                  <div className="space-y-2">
                        <h4 className="font-medium leading-none ">
                              Update Todo
                        </h4>
                        <p className="text-sm text-muted-foreground">
                              Enter a small description of the task.
                        </p>
                  </div>
                  <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-start gap-3">
                              <Label htmlFor="maxHeight">Name</Label>
                              <Input
                                    id="todo"
                                    placeholder="Go to gym"
                                    className=" w-60 h-8"
                                    required={true}
                                    // value={todo}
                                    onChange={(e) => setTodo(e.target.value)}
                                    defaultValue={currentTitle}
                              />
                        </div>
                        <div>
                              <DatePickerWithPresets
                                    onDateChange={handleDateChange}
                              />
                        </div>
                  </div>
                  <div>
                        <Button variant="secondary" onClick={onSubmit}>
                              Update
                        </Button>
                  </div>
            </div>
      );
}
