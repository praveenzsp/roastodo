"use client";
import { Todo as TodoType } from "@/app/todos/page";
import DialogBox from "@/components/DialogBox";
import { Button } from "./ui/button";
import { SquarePlus } from "lucide-react";

function Todo({ title, completed, expiresAt, expired }: TodoType) {
      // const handleMarkComplete = () => {
      //     alert("Marked as completed");
      // };

      const calculateMinutesLeft = () => {
            const now = new Date();
            const expiryDate = new Date(expiresAt);
            const diff = expiryDate.getTime() - now.getTime();

            const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hoursLeft = Math.floor(
                  (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutesLeft = Math.floor(
                  (diff % (1000 * 60 * 60)) / (1000 * 60)
            );

            return {
                  days: Math.max(0, daysLeft),
                  hours: Math.max(0, hoursLeft),
                  minutes: Math.max(0, minutesLeft),
            };
      };
      return (
            <>
                  {expired ? (
                        <div>Todo is expired</div>
                  ) : (
                        <div className="flex flex-row border-[1px] border-gray-300 p-4 my-2 rounded-md justify-between md:w-[80vw] w-[90vw] items-center">
                              <h2 className="flex-1">{title}</h2>

                              <p className="mx-2 md:mx-10">
                                    {calculateMinutesLeft().days > 0
                                          ? `${calculateMinutesLeft().days}d ${
                                                  calculateMinutesLeft().hours
                                            }h left`
                                          : `${calculateMinutesLeft().hours}h ${
                                                  calculateMinutesLeft().minutes
                                            }m left`}
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
                  )}
            </>
      );
}

export default Todo;

export function AddTodo() {
      return (
            <Button variant="outline">
                  <SquarePlus /> Add Todo
            </Button>
      );
}
