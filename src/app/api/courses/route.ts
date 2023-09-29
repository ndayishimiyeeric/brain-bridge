import { db } from "@/lib/db";
import { CreateCourseSchema } from "@/lib/varidators/course";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";

export async function POST(req:Request) {
  try {
    const { userId } = auth()
    const payload = await req.json();
    const { title } = CreateCourseSchema.parse(payload);
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const course = await db.course.create({
      data: {
        title,
        userId,
      },
    });

    return NextResponse.json(course, { status: 201 });
    
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return new NextResponse("Something went wrong", { status: 500 });
  }
}