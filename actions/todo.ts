"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/db";
import { getUser } from "./user";


export async function addTodo(
      todoTitle: string,
      expiryDate: Date | string,
      userEmail: string
) {
      try {
            if (!todoTitle || !expiryDate) {
                  return {
                        error: "Title and expiry date are required",
                        success: false,
                  };
            }

            const { user } = await getUser(userEmail);

            if (!user) {
                  return { error: "User not found", success: false };
            }

            const todo = await prisma.todo.create({
                  data: {
                        title: todoTitle,
                        expiresAt: expiryDate,
                        completed: false,
                        expired: false,
                        createdAt: new Date(),
                        userId: user?.id,
                  },
            });

            // This tells Next.js to revalidate the cache for the /todos route
            revalidatePath("/todos");

            return { todo, success: true };
      } catch (error) {
            console.error("Failed to create todo:", error);
            return { error: "Failed to create todo", success: false };
      }
}

export async function getTodos(userEmail: string) {
      try {
            if (!userEmail) {
                  return { error: "User email is required", success: false };
            }

            const { user } = await getUser(userEmail);

            if (!user) {
                  return { error: "User not found", success: false };
            }

            const todos = await prisma.todo.findMany({
                  orderBy: {
                        createdAt: "desc",
                  },
                  where: {
                        userId: user?.id,
                  },
            });
            return { todos, success: true };
      } catch (error) {
            console.error("Failed to fetch todos:", error);
            return { error: "Failed to fetch todos", success: false };
      }
}

export async function updateTodo(
      id: number,
      userEmail: string,
      data: { title?: string; expiresAt?: Date; completed?: boolean }
) {
      try {
            const { user } = await getUser(userEmail);

            if (!user) {
                  return { error: "User not found", success: false };
            }

            const todo = await prisma.todo.update({
                  where: { id, userId: user.id },
                  data,
            });
            revalidatePath("/todos");
            return { todo, success: true };
      } catch (error) {
            console.error("Failed to update todo:", error);
            return { error: "Failed to update todo", success: false };
      }
}

export async function deleteTodo(id: number, userEmail: string) {
      try {
            if (!id) {
                  return { error: "Todo ID is required", success: false };
            }

            const { user } = await getUser(userEmail);

            if (!user) {
                  return { error: "User not found", success: false };
            }

            const todo = await prisma.todo.delete({
                  where: { id, userId: user.id },
            });
            revalidatePath("/todos");
            return { todo, success: true };
      } catch (error) {
            console.error("Failed to delete todo:", error);
            return { error: "Failed to delete todo", success: false };
      }
}
