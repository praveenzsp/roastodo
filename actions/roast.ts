"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const generateRoast = async ({ todoTitle }: { todoTitle: string }) => {
    try {
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
        });
        
        const prompt = `generate a brutal level roast of maximum of 3 sentences for not completing this todo: ${todoTitle}. Even try using some adult language. Make it short and concise and intuitive. Make it sound like a friend and not a teacher.`;

        const result = await model.generateContent(prompt);

        const response =  result.response;
        const text = response.text();
        
        if (!text) {
            throw new Error("No response from AI");
        }
        
        return {
            roast: text,
            success: true
        };
    } catch (error) {
        console.error("Roast generation error:", error);
        return {
            roast: "Damn, even the AI is disappointed in your todo completion skills! 😅",
            success: false
        };
    }
};