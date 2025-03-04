import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/navbar";
// import { auth } from "./auth";
// import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "RoasTodo",
    description: "A todo app that roasts you",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // const session = await auth();
    
    return (
        <html lang="en">
            <body className={inter.className}>
                {/* <SessionProvider session={session}> */}
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <div className="min-h-screen flex flex-col">
                            <Navbar />
                            <main className="flex-1">
                                {children}
                            </main>
                        </div>
                    </ThemeProvider>
                {/* </SessionProvider> */}
            </body>
        </html>
    );
}
