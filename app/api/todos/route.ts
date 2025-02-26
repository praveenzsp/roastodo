import prisma from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const todos = await prisma.todo.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return NextResponse.json({ todos });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch todos" + error },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const todo = await prisma.todo.create({
            data: {
                title: body.title,
                completed: false,
				expiresAt: body.expiresAt,
            },
        });
        return NextResponse.json(todo, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create todo" + error },
            { status: 500 }
        );
    }
}
