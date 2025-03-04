"use server"

import { signOut } from "@/auth"

export async function handleSignOut() {
  try {
    await signOut({ redirectTo: "/signin" })
  } catch (error) {
    console.error("Failed to sign out:", error)
    throw error
  }
}