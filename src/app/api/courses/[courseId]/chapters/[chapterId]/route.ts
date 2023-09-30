import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"
import { ZodError } from "zod"

export async function PATCH(req:Request, { params }: { params: { courseId: string, chapterId: string } }) {
  try {
    const { userId } = auth();
    const { isPublised, values } = await req.json();
    const { courseId, chapterId } = params;

    if (!userId) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    })

    if (!course) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const chapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId
      },
      data: {
        ...values,
      }
    })

    return NextResponse.json(chapter, {status: 200});
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({error: error.issues}, {status: 400})
    }

    return new NextResponse("Somethin went wrong", {status: 500})
  }
}