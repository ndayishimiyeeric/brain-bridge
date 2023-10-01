import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = auth();
    const { courseId } = params;

    if (!userId) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          }
        }
      }
    })

    if (!course) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const hasPublishedChapters = course.chapters.some(chapter => chapter.isPublished);

    if (!hasPublishedChapters || !course.title || !course.description || !course.categoryId || !course.imageUrl) {
      return NextResponse.json({error: "Missing required field"}, {status: 401});
    }

    const updatedCourse = await db.course.update({
      where: {
        id: courseId, 
        userId,
      },
      data: {
        isPublished: true,
      }
    })

    return NextResponse.json(updatedCourse);
  } catch (error) {
    return new NextResponse("Somethin went wrong", {status: 500})
  }
}