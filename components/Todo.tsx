"use client";
import { Todo as TodoType } from "@/app/todos/page";
import DialogBox from "@/components/DialogBox";
import { Button } from "./ui/button";
import { SquarePlus} from "lucide-react"

function Todo({ title, completed }: TodoType) {
    // const handleMarkComplete = () => {
    //     alert("Marked as completed");
    // };

    const calculateMinutesLeft = () => {
        const now = new Date();
        const endOfDay = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            23,
            59,
            59
        );
        const diff = endOfDay.getTime() - now.getTime();
        const minutesLeft = Math.max(0, Math.floor(diff / (1000 * 60)));
        return minutesLeft;
    };
    return (
        <div className="flex flex-row border-[1px] border-gray-300 p-4 my-2 rounded-md justify-between md:w-[80vw] w-[90vw] items-center">
            <h2 className="flex-1">{title}</h2>

            <p className="mx-2 md:mx-10">
                {Math.floor(calculateMinutesLeft() / 60)}h{" "}
                {calculateMinutesLeft() % 60}m left
            </p>

            <Button variant="ghost">Edit</Button>
            <p className="ml-5">
                {completed ? (
                    "Completed"
                ) : (
                    // <Button variant="ghost" onClick={handleMarkComplete}>
                    //     Mark it done
                    // </Button>
                    <DialogBox />
                )}
            </p>
        </div>
    );
}

export default Todo;

export function AddTodo() {
    return (
        <Button variant='outline'>
            <SquarePlus /> Add Todo
        </Button>
    );
}
