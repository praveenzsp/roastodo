"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun } from "lucide-react";
import {
      Sheet,
      SheetContent,
      SheetTrigger,
      SheetTitle,
} from "@/components/ui/sheet";
import { handleSignOut } from "@/actions/auth";
import { useTheme } from "next-themes";
import { useState } from "react";

export function Navbar() {

      const { setTheme } = useTheme();
      const [isDark, setIsDark] = useState(true);
      console.log(isDark);
      const onSignOut = async () => {
            try {
                  await handleSignOut();
            } catch (error) {
                  console.error('Error during signout:', error);
            }
      };

      const handleThemeToggle = () => {
            setTheme(isDark ? "light" : "dark");
            setIsDark(!isDark);
      }

      return (
            <nav className="border-b">
                  <div className="flex h-16 items-center px-4 container mx-auto">
                        <Link href="/" className="font-bold text-xl">
                              RoasTodo
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-4 ml-auto">
                              <Link href="/about">
                                    <Button variant="ghost">About</Button>
                              </Link>
                              <Link href="/todos">
                                    <Button variant="ghost">My Todos</Button>
                              </Link>
                              <Button onClick={handleThemeToggle} variant="outline">
                                    {
                                          isDark ? <Sun /> : <Moon />
                                    }
                              </Button>
                              <Button variant="destructive" onClick={onSignOut}>Logout</Button>
                        </div>

                        {/* Mobile Navigation */}
                        <div className="md:hidden ml-auto">
                              <Sheet>
                                    <SheetTrigger asChild>
                                          <Button variant="ghost" size="icon">
                                                <Menu className="h-5 w-5" />
                                          </Button>
                                    </SheetTrigger>
                                    <SheetContent>
                                          <SheetTitle className="sr-only">
                                                Navigation Menu
                                          </SheetTitle>
                                          <div className="flex flex-col space-y-4 mt-4">
                                                <Link href="/about">
                                                      <Button
                                                            variant="ghost"
                                                            className="w-full justify-start"
                                                      >
                                                            About
                                                      </Button>
                                                </Link>
                                                <Link href="/todos">
                                                      <Button
                                                            variant="ghost"
                                                            className="w-full justify-start"
                                                      >
                                                            My Todos
                                                      </Button>
                                                </Link>
                                                <Button
                                                      variant="destructive"
                                                      className="w-full justify-start"
                                                      onClick={onSignOut}
                                                >
                                                      Logout
                                                </Button>
                                          </div>
                                    </SheetContent>
                              </Sheet>
                        </div>
                  </div>
            </nav>
      );
}
