"use server";
import prisma from "@/db";

export async function createUser(email: string) {
      try {
            if (!email) {
                  return { error: "Email is required", success: false };
            }

            const userExists = await prisma.user.findUnique({
                  where: {
                        email,
                  },
            });

            if (userExists) {
                  return { user: userExists, success: true };
            }

            const user = await prisma.user.create({
                  data: {
                        email,
                  },
            });

            return { user, success: true };
      } catch (error) {
            console.error("Failed to create user:", error);
            return { error: "Failed to create user", success: false };
      }
}

export async function getUser(email: string) {
      try {
            if (!email) {
                  throw new Error("Email is required");
            }
            const user = await prisma.user.findUnique({
                  where: {
                        email: email,
                  },
            });
            return { user };
      } catch (error) {
            console.error("Failed to get user:", error);
            return { error: "Failed to get user" };
      }
}


