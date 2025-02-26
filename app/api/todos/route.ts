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

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const todo = await prisma.todo.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                expiresAt: body.expiresAt
            }
        });
        return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update todo" + error },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        // Example URL: /api/todos?id=123e4567-e89b-12d3-a456-426614174000
        const { searchParams } = new URL(request.url); // searchParam nothing but query params
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: "Todo ID is required" },
                { status: 400 }
            );
        }

        const todo = await prisma.todo.delete({
            where: {
                id: id
            }
        });

        return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete todo" + error },
            { status: 500 }
        );
    }
}


