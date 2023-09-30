import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"
import { ZodError } from "zod"

export async function PUT(req:Request, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = auth();
    const { list } = await req.json();
    const { courseId } = params;

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

    for (const item of list) {
      await db.chapter.update({
        where: {
          id: item.id,
        },
        data: {
          position: item.position,
        }
      })
    }

    return new NextResponse("ok", {status: 200});
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({error: error.issues}, {status: 400})
    }

    return new NextResponse("Somethin went wrong", {status: 500})
  }
}