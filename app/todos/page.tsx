import AddTodoPopover from "@/components/AddTodoPopover";
import Todo from "@/components/Todo";
import { JSX } from "react";
import { getTodos } from "@/actions/todo";
import { auth } from "@/auth";
import ParticleBackground from "@/components/ParticleBackground";

export interface Todo {
      id: number;
      userEmail: string;
      title: string;
      completed: boolean;
      expiresAt: Date;
      expired: boolean;
}

export default async function TodosPage(): Promise<JSX.Element> {
      const session = await auth();
      if (!session) {
            return <div>Not authorized</div>;
      }

      const { todos } = await getTodos(session?.user?.email as string);
      // todos = todos?.filter((todo) => todo.completed == false);
      return (
            <div className="flex flex-col justify-center items-center">
                  <div className="absolute top-0 left-0 w-full h-full -z-10">
                        <ParticleBackground />
                  </div>
                  <h1 className="text-3xl my-10">
                        {todos && todos.length > 0
                              ? "Here are your todos"
                              : "Add a todo to get started"}
                  </h1>
                  <div className="mb-5">
                        <AddTodoPopover
                              userEmail={session.user?.email as string}
                        />
                  </div>
                  {todos?.map((todo) => (
                        <Todo
                              key={todo.id}
                              id={todo.id}
                              userEmail={session.user?.email as string}
                              title={todo.title}
                              completed={todo.completed}
                              expiresAt={todo.expiresAt}
                              expired={todo.expired}
                        />
                  ))}
            </div>
      );
}
