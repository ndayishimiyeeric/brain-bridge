import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const { userId } = auth();
    const { attachmentUrl } = await req.json();
    const { courseId } = params;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!attachmentUrl) {
      return NextResponse.json(
        { error: "attachment can not be empty" },
        { status: 400 },
      );
    }

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const attachment = await db.attachment.create({
      data: {
        url: attachmentUrl,
        name: attachmentUrl.split("/").pop(),
        course: {
          connect: {
            id: courseId,
          },
        },
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    return new NextResponse("Something went wrong", { status: 500 });
  }
}
