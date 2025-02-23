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

function AddTodoPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    <SquarePlus />
                    Add Todo
                </Button>
            </PopoverTrigger>
            <PopoverContent className="">
                <AddTodoForm />
            </PopoverContent>
        </Popover>
    );
}

export default AddTodoPopover;

function AddTodoForm() {
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
                    />
                </div>
                <div>
                    <DatePickerWithPresets />
                </div>
            </div>
            <div>
                <Button variant="secondary">ADD</Button>
            </div>
        </div>
    );
}
