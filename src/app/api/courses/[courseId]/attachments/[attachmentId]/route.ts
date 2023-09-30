import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"
import { ZodError } from "zod"

export async function DELETE(req: Request, { params }: { params: { courseId: string, attachmentId: string } }) {
  try {
    const { userId } = auth();
    const { attachmentId, courseId } = params;

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

    const attachement = await db.attachment.delete({
      where: {
        id: attachmentId,
        courseId
      }
    })

    return NextResponse.json(attachement);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({error: error.issues}, {status: 400})
    }

    return new NextResponse("Somethin went wrong", {status: 500})
  }
}