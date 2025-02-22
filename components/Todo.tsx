"use client";
import { Todo as TodoType } from "@/app/todos/page";
import { Button } from "./ui/button";

function Todo({ title, completed }: TodoType) {
    const handleMarkComplete = () => {
        alert("Marked as completed");
    };
    return (
        <div className="flex flex-row border-2 border-gray-300 p-4 my-2 rounded-md justify-between md:w-[80vw] w-[90vw] items-center">
            <h2 className="flex-1">{title}</h2>

            <p className="mx-2 md:mx-10">9 hours left</p>

            <p>
                {completed ? (
                    "Completed"
                ) : (
                    <Button variant="ghost" onClick={handleMarkComplete}>
                        Mark it done
                    </Button>
                )}
            </p>
        </div>
    );
}

export default Todo;
