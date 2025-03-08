"use client";
import { ChevronRight } from "lucide-react";
import { Button as CustomButton } from "./ui/button";
import { useRouter } from "next/navigation";


export default function Button({ text }: { text: string }) {
    const navigate = useRouter();
    const handleGetStarted = () => {
        navigate.push("/todos");
    };
    return (
        <CustomButton variant="default" onClick={handleGetStarted}>
            {text}
            <ChevronRight />
        </CustomButton>
    );
}
