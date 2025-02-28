import AddTodoPopover from "@/components/AddTodoPopover";
import Todo from "@/components/Todo";
import { JSX } from "react";
import axios from "axios";

export interface Todo {
      id: number;
      title: string;
      completed: boolean;
      expiresAt: Date;
      expired: boolean;
}
interface Todos {
      todos: Todo[];
}
async function getTodos(): Promise<Todos> {
      const response = await axios.get("http://localhost:3000/api/todos");
      const todos = response.data;
      return todos;
}

export default async function TodosPage(): Promise<JSX.Element> {
      let { todos } = await getTodos();
      todos = todos?.filter((todo) => todo.completed == false);
      return (
            <div className="flex flex-col justify-center items-center">
                  <h1 className="text-4xl my-10">Here are your todos</h1>
                  <div className="mb-5">
                        <AddTodoPopover />
                  </div>
                  {todos.map((todo: Todo) => (
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
