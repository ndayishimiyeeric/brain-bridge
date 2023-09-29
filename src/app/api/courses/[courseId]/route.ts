import { db } from "@/lib/db";
import { CreateCourseSchema } from "@/lib/varidators/course";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function PATCH(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = auth();
    const payload = await req.json();
    const { title } = CreateCourseSchema.parse(payload);
    const { courseId } = params;


    if (!userId) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        title,
      },
    })

    return NextResponse.json(course);
    
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({error: error.issues}, {status: 400})
    }

    return new NextResponse("Somethin went wrong", {status: 500})
  }
}