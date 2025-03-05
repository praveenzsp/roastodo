"use client";
import { Todo as TodoType } from "@/app/todos/page";
import DialogBox from "@/components/DialogBox";
import { Button } from "./ui/button";
import { AlertCircle, CheckCircle2, Clock, SquarePlus, Trash } from "lucide-react";
import { deleteTodo, updateTodo } from "@/actions/todo";
import EditTodoPopover from "./EditTodoPopover";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
            <AnimatePresence mode="popLayout">
                  <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                              "group relative flex flex-row items-center justify-between",
                              "rounded-lg border bg-card p-4 shadow-sm transition-all",
                              "hover:shadow-md",
                              "my-3 md:w-[50vw] w-[90vw]",
                              {
                                    "border-orange-500/30 bg-orange-500/5 dark:border-orange-400/20 dark:bg-orange-400/5": isExpired(),
                                    "border-muted bg-muted/50": completed,
                                    "border-border": !isExpired() && !completed,
                              }
                        )}
                  >
                        <div className="flex flex-1 items-center gap-4">
                              <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                              >
                                    {completed ? (
                                          <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 200 }}
                                          >
                                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                          </motion.div>
                                    ) : (
                                          isExpired() ? (
                                                <motion.div
                                                      animate={{ rotate: [0, 5, -5, 0] }}
                                                      transition={{ duration: 0.5, repeat: 2 }}
                                                >
                                                      <AlertCircle className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                                                </motion.div>
                                          ) : (
                                                <motion.div
                                                      animate={{ rotate: 360 }}
                                                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                                >
                                                      <Clock className="h-5 w-5 text-muted-foreground" />
                                                </motion.div>
                                          )
                                    )}
                              </motion.div>
                              <motion.h2
                                    layout
                                    className={cn(
                                          "font-medium",
                                          completed && "text-muted-foreground line-through",
                                          isExpired() && "text-orange-600 dark:text-orange-400"
                                    )}
                              >
                                    {title}
                              </motion.h2>
                        </div>

                        {!completed && !isExpired() && (
                              <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mx-2 md:mx-10 text-sm text-muted-foreground"
                              >
                                    {calculateMinutesLeft().days > 0
                                          ? `${calculateMinutesLeft().days}d ${
                                                  calculateMinutesLeft().hours
                                            }h left`
                                          : `${calculateMinutesLeft().hours}h ${
                                                  calculateMinutesLeft().minutes
                                            }m left`}
                              </motion.p>
                        )}
                        {isExpired() && (
                              <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mx-2 md:mx-10 text-sm font-medium text-orange-600 dark:text-orange-400"
                              >
                                    Expired
                              </motion.p>
                        )}

                        <motion.div 
                              className="flex items-center gap-2"
                              whileHover={{ scale: 1.02 }}
                        >
                              {!isExpired() && !completed && (
                                    <EditTodoPopover
                                          id={id}
                                          currentTitle={title}
                                          currentExpiryDate={expiresAt}
                                    />
                              )}
                              
                              {isExpired() ? (
                                    <DialogBox id={id} todoTitle={title} />
                              ) : completed ? (
                                    <motion.div whileTap={{ scale: 0.95 }}>
                                          <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={handleDeleteTodo}
                                                className="text-muted-foreground hover:text-destructive"
                                          >
                                                <Trash className="h-4 w-4" />
                                          </Button>
                                    </motion.div>
                              ) : (
                                    <motion.div whileTap={{ scale: 0.95 }}>
                                          <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={handleMarkComplete}
                                                className="gap-2"
                                          >
                                                <CheckCircle2 className="h-4 w-4" />
                                                Complete
                                          </Button>
                                    </motion.div>
                              )}
                        </motion.div>
                  </motion.div>
            </AnimatePresence>
      );
}

export default Todo;

export function AddTodo() {
      return (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" className="gap-2">
                        <SquarePlus className="h-5 w-5" />
                        Add Todo
                  </Button>
            </motion.div>
      );
}
