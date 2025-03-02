"use client";
import { Todo as TodoType } from "@/app/todos/page";
import DialogBox from "@/components/DialogBox";
import { Button } from "./ui/button";
import { SquarePlus, Trash } from "lucide-react";
import { deleteTodo, updateTodo } from "@/actions/todo";
import EditTodoPopover from "./EditTodoPopover";

function Todo({ id, title, expiresAt, completed }: TodoType) {
      const calculateMinutesLeft = () => {
            const now = new Date();
            const expiryDate = new Date(expiresAt);
            // Set expiry to 11:59 PM of the selected date
            expiryDate.setHours(23, 59, 59, 999);

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

      const isExpired = () => {
            const timeLeft = calculateMinutesLeft();
            return timeLeft.hours === 0 && timeLeft.minutes === 0;
      };

      const handleMarkComplete = async () => {
            // alert("Marking as complete");
            const updateResult = await updateTodo(id, {
                  completed: true,
            });

            if (!updateResult.success) {
                  alert("Failed to mark todo as complete");
                  return;
            }
      };

      const handleDeleteTodo = async () => {
            const deleteResult = await deleteTodo(id);
            if (!deleteResult.success) {
                  alert("Failed to delete todo");
                  return;
            }
      };

      return (
            <>
                  <div
                        className={`flex flex-row border-[1px] ${
                              isExpired() ? "border-red-500" : "border-gray-300"
                        } p-4 my-2 rounded-md justify-between md:w-[80vw] w-[90vw] items-center`}
                  >
                        <h2 className="flex-1">{title}</h2>

                        {!completed && !isExpired() && (
                              <p className="mx-2 md:mx-10">
                                    {calculateMinutesLeft().days > 0
                                          ? `${calculateMinutesLeft().days}d ${
                                                  calculateMinutesLeft().hours
                                            }h left`
                                          : `${calculateMinutesLeft().hours}h ${
                                                  calculateMinutesLeft().minutes
                                            }m left`}
                              </p>
                        )}
                        {isExpired() && (
                              <p className="mx-2 md:mx-10">Expired</p>
                        )}

                        {!isExpired() && !completed && (
                              <EditTodoPopover id={id} currentTitle={title} currentExpiryDate={expiresAt} />
                        )}
                        <div className="ml-5">
                              {isExpired() ? (
                                    <DialogBox />
                              ) : completed ? (
                                    <div className="flex flex-row items-center justify-center gap-6">
                                          <p>Done</p>
                                          <Button variant="ghost" onClick={handleDeleteTodo}>
                                                <Trash />
                                          </Button>
                                    </div>
                              ) : (
                                    <Button
                                          variant="ghost"
                                          onClick={handleMarkComplete}
                                    >
                                          Mark it done
                                    </Button>
                              )}
                        </div>
                  </div>
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
