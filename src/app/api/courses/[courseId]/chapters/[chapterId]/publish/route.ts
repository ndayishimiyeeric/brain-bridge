import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req:Request, { params }: { params: { courseId: string, chapterId: string } }) {
  try {
    const { userId } = auth();
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

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId
      },
    });

    if (!chapter) {
      return NextResponse.json({error: "Not found"}, {status: 404});
    }

    const muxData = await db.muxData.findFirst({
      where: {
        chapterId,
      }
    });

    if (!muxData || !chapter.title || !chapter.description || !chapter.videoUrl) {
      return NextResponse.json({error: "Missing required fields"}, {status: 400});
    }

    const updatedChapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId
      },
      data: {
        isPublished: true,
      }
    })

    return NextResponse.json(updatedChapter);
  } catch (error) {
    return new NextResponse("Somethin went wrong", {status: 500})
  }
}