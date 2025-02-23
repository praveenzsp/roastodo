
import Todo, { AddTodo } from "@/components/Todo";
import { JSX } from "react";


export interface Todo {
	id: number;
    title: string;
    completed: boolean;
}
interface Todos {
	todos: Todo[];
}
async function getTodos(): Promise<Todos> {
	const response = await fetch("https://jsonplaceholder.typicode.com/todos");
	const todos = await response.json();
	return { todos };
}

export default async function TodosPage(): Promise<JSX.Element> {
    let { todos } = await getTodos();
	todos=todos.filter(todo=>todo.completed==false);
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl my-10">Here are your todos</h1>
            <div className="mb-10"><AddTodo/></div>
            {todos.map((todo: Todo) => (
                <Todo
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    completed={todo.completed}
                />
            ))}
        </div>
    );
}
