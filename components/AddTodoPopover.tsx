"use client";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { SquarePlus } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { DatePickerWithPresets } from "./DatePicker";
import { useState } from "react";
import { addTodo } from "@/actions/todo";
import { toast } from 'react-toastify';

function AddTodoPopover({ userEmail }: { userEmail: string }) {
    const [open, setOpen] = useState(false);
    const [todo, setTodo] = useState("");
    const [date, setDate] = useState<Date | null>(null);


    const handleAddTodo = async () => {
        if (!todo || !date) {
            toast.warning("Please fill in all fields");
            return;
        }

        try {
            const result = await addTodo(todo, date, userEmail);
            if (!result.success) {
                toast.error(result.error || "Failed to create todo");
                return;
            }

            toast.success("Todo added successfully! 🚀");
            setOpen(false);
            setTodo("");
            setDate(null);
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while creating the todo");
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    <SquarePlus />
                    Add Todo
                </Button>
            </PopoverTrigger>
            <PopoverContent className="">
                <AddTodoForm 
                    todo={todo}
                    setTodo={setTodo}
                    setDate={setDate}
                    onSubmit={handleAddTodo}
                />
            </PopoverContent>
        </Popover>
    );
}

export default AddTodoPopover;

function AddTodoForm({
    todo,
    setTodo,
    setDate,
    onSubmit
}: {
    todo: string;
    setTodo: (todo: string) => void;
    setDate: (date: Date | null) => void;
    onSubmit: () => void;
}) {
    const handleDateChange = (date: Date | null) => {
        setDate(date);
    }

    return (
        <div className="grid gap-6">
            <div className="space-y-2">
                <h4 className="font-medium leading-none ">Add Todo</h4>
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
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                    />
                </div>
                <div>
                    <DatePickerWithPresets onDateChange={handleDateChange} />
                </div>
            </div>
            <div>
                <Button variant="secondary" onClick={onSubmit}>ADD</Button>
            </div>
        </div>
    );
}
