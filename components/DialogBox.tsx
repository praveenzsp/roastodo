"use client";
import { generateRoast } from "@/actions/roast";
import { deleteTodo } from "@/actions/todo";
import { Button } from "@/components/ui/button";
import {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogFooter,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function DialogBox({ id, todoTitle }: { id: number, todoTitle: string }) {
    const [roast, setRoast] = useState<string>("");

    useEffect(()=>{
        const fetchRoast = async ()=>{
            const result = await generateRoast({todoTitle: todoTitle});
            // console.log(result);
            if(result.success){
                setRoast(result.roast || "");
            }
            else{
                setRoast("Failed to generate roast");
            }
        }
        fetchRoast();
    }, [todoTitle])

      const handleDeleteTodo = async () => {
            const result = await deleteTodo(id);
            if (result.success) {
                  toast.success("Todo deleted successfully");
            } else {
                  toast.error("Failed to delete todo");
            }
      };
      return (
            <Dialog>
                  <DialogTrigger asChild>
                        <Button
                              variant="destructive"
                        >
                              Delete
                        </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
                        <DialogHeader>
                              <DialogTitle>A sweet message</DialogTitle>
                              <DialogDescription className="text-gray-300">
                                    Since you&apos;re so busy all day,
                                    here&apos;s a small message for you
                              </DialogDescription>
                        </DialogHeader>
                        <div>
                              <p>
                                    {roast}
                              </p>
                              <br></br>
                              <p className="text-gray-300 text-sm">
                                    So do you regret not completing it?
                              </p>
                        </div>
                        <DialogFooter>
                              <Button 
                                    type="submit" 
                                    variant="secondary" 
                                    onClick={handleDeleteTodo}
                              >
                                    Yes, I regret
                              </Button>
                        </DialogFooter>
                  </DialogContent>
            </Dialog>
      );
}

export default DialogBox;
