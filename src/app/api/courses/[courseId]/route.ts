import { db } from "@/lib/db";
import { UpdateCourseSchema } from "@/lib/varidators/course";
import { auth } from "@clerk/nextjs";
import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
);

export async function PATCH(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = auth();
    const payload = await req.json();
    const { title, description, imageUrl,categoryId, price } = UpdateCourseSchema.parse(payload);
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
        description,
        imageUrl,
        categoryId,
        price,
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

export async function DELETE(req:Request, { params }: { params: { courseId: string } }) {
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

    for (const chapter of course.chapters) {
      if (chapter.muxData?.chapterId) {
        await Video.Assets.del(chapter.muxData.assetId!);
      }
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: courseId,
      }
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    return new NextResponse("Somethin went wrong", {status: 500})
  }
}
