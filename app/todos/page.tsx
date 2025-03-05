import AddTodoPopover from "@/components/AddTodoPopover";
import Todo from "@/components/Todo";
import { JSX } from "react";
import { getTodos } from "@/actions/todo";
import { auth } from "@/auth";
import { toast, ToastOptions } from 'react-toastify';

export interface Todo {
      id: number;
      title: string;
      completed: boolean;
      expiresAt: Date;
      expired: boolean;
}

export const toastConfig: ToastOptions = {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
};

export const showToast = {
      success: (message: string) => toast.success(message, toastConfig),
      error: (message: string) => toast.error(message, toastConfig),
      info: (message: string) => toast.info(message, toastConfig),
      warning: (message: string) => toast.warning(message, toastConfig),
};

export default async function TodosPage(): Promise<JSX.Element> {

      const session = await auth();
      if (!session) {
            return <div>Not authorized</div>;
      }

      const { todos } = await getTodos();
      // todos = todos?.filter((todo) => todo.completed == false);
      return (
            <div className="flex flex-col justify-center items-center">
                  <h1 className="text-4xl my-10">Here are your todos</h1>
                  <div className="mb-5">
                        <AddTodoPopover />
                  </div>
                  {todos?.map((todo) => (
                        <Todo
                              key={todo.id}
                              id={todo.id}
                              title={todo.title}
                              completed={todo.completed}
                              expiresAt={todo.expiresAt}
                              expired={todo.expired}
                        />
                  ))}
            </div>
      );
}
