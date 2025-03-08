import { auth } from "@/auth";
import Hero from "@/components/Hero";
import { redirect } from "next/navigation";

export default async function Home() {
    const session  = await auth();
    if (!session) {
        redirect("/signin")
    }
    return <Hero  email={session?.user?.email}/>;
}
