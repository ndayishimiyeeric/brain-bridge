import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"
import { ZodError } from "zod"

export async function POST(req:Request, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = auth();
    const { title } = await req.json();
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

    const previousChapter = await db.chapter.findFirst({
      where: {
        courseId,
      },
      orderBy: {
        position: "desc",
      },
    });
    const position = previousChapter?.position ? previousChapter.position + 1 : 1;

    const chapter = await db.chapter.create({
      data: {
        title,
        position,
        course: {
          connect: {
            id: courseId,
          }
        }
      }
    });

    return NextResponse.json(chapter);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({error: error.issues}, {status: 400})
    }

    return new NextResponse("Somethin went wrong", {status: 500})
  }
}