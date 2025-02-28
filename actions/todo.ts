"use server";

import prisma from "@/db";

export async function addTodo(todoTitle: string, expiryDate: Date | string) {
      try {
            if (!todoTitle || !expiryDate) {
                  return { error: "Title and expiry date are required", success: false };
            }

            const todo = await prisma.todo.create({
                  data: {
                        title: todoTitle,
                        expiresAt: expiryDate,
                        completed: false,
                        expired: false,
                        createdAt: new Date(),
                  },
            });

            return { todo, success: true };

      } catch (error) {
            console.error("Failed to create todo:", error);
            return { error: "Failed to create todo", success: false };
      }
}

export async function getTodos() {
      try {
            const todos = await prisma.todo.findMany({
                  orderBy: {
                        createdAt: "desc",
                  },
            });
            return { todos, success: true };
      } catch (error) {
            console.error("Failed to fetch todos:", error);
            return { error: "Failed to fetch todos", success: false };
      }
}

export async function updateTodo(id: string, data: { title?: string; expiresAt?: Date }) {
      try {
            const todo = await prisma.todo.update({
                  where: { id },
                  data
            });
            return { todo, success: true };
      } catch (error) {
            console.error("Failed to update todo:", error);
            return { error: "Failed to update todo", success: false };
      }
}

export async function deleteTodo(id: string) {
      try {
            if (!id) {
                  return { error: "Todo ID is required", success: false };
            }

            const todo = await prisma.todo.delete({
                  where: { id }
            });
            return { todo, success: true };
      } catch (error) {
            console.error("Failed to delete todo:", error);
            return { error: "Failed to delete todo", success: false };
      }
}
