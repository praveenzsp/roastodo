"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function SignInPage() {

      const handleSignIn = async () => {
            await signIn("google", { callbackUrl: "/" });
      };

      return (
            <main className="flex min-h-screen relative items-center justify-center p-4">
                  {/* Background Elements */}
                  <div className="absolute inset-0 max-w-full overflow-hidden">
                        {/* Top gradient blob */}
                        <div className="absolute top-0 left-1/4 w-96 h-96 -translate-y-1/2">
                              <div className="absolute inset-0 rotate-45 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl" />
                        </div>
                  </div>

                  {/* Grid Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

                  <div className="relative">
                        <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5 }}
                              className="w-full max-w-sm mx-auto"
                        >
                              {/* Logo */}
                              <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                          type: "spring",
                                          stiffness: 500,
                                          damping: 30,
                                          delay: 0.2,
                                    }}
                                    className="flex flex-col items-center gap-4 mb-8"
                              >
                                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                                          RoasTodo
                                    </h1>
                              </motion.div>

                              {/* Content Card */}
                              <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="space-y-6 bg-card/50 border rounded-2xl backdrop-blur-sm p-6 relative overflow-hidden"
                              >
                                    {/* Card gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-background/10 to-background/0 pointer-events-none" />

                                    <div className="relative space-y-4">
                                          {/* Welcome Badge */}
                                          <div className="flex justify-center">
                                                <motion.div
                                                      initial={{
                                                            opacity: 0,
                                                            y: 10,
                                                      }}
                                                      animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                      }}
                                                      transition={{
                                                            delay: 0.4,
                                                      }}
                                                      className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary group"
                                                >
                                                      <Sparkles className="w-4 h-4 mr-2" />
                                                      Welcome Back
                                                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                </motion.div>
                                          </div>

                                          {/* Sign In Text */}
                                          <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 }}
                                                className="text-center space-y-2"
                                          >
                                                <h2 className="text-xl font-semibold tracking-tight">
                                                      Sign in to your account
                                                </h2>
                                                <p className="text-sm text-muted-foreground">
                                                      Get ready to be productive
                                                      (or get roasted)
                                                </p>
                                          </motion.div>

                                          {/* Sign In Button */}
                                          <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.6 }}
                                          >
                                                <Button
                                                      variant="outline"
                                                      onClick={handleSignIn}
                                                      className="w-full relative group hover:border-primary/50 transition-colors"
                                                >
                                                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                                                      <span className="relative flex items-center justify-center gap-2">
                                                            <FcGoogle className="w-5 h-5" />
                                                            Continue with Google
                                                      </span>
                                                </Button>

                                                <p className="mt-4 text-xs text-center text-muted-foreground">
                                                      By continuing, you agree
                                                      to get roasted for missing
                                                      deadlines
                                                </p>
                                          </motion.div>
                                    </div>
                              </motion.div>
                        </motion.div>
                  </div>
            </main>
      );
}
