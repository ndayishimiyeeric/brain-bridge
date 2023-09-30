import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"
import { ZodError } from "zod"
import Mux from "@mux/mux-node";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
);

export async function PATCH(req:Request, { params }: { params: { courseId: string, chapterId: string } }) {
  try {
    const { userId } = auth();
    const { isPublised, ...values } = await req.json();
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

    if (values.videoUrl) {
      const existingVideoData = await db.muxData.findFirst({
        where: {
          chapterId,
        }
      })

      if (existingVideoData) {
        await Video.Assets.del(existingVideoData.assetId!);
        await db.muxData.delete({
          where: {
            id: existingVideoData.id,
          }
        })
      }

      const asset = await Video.Assets.create({
        input: values.videoUrl,
        playback_policy: "public",
        test: false,
      })

      await db.muxData.create({
        data: {
          assetId: asset.id,
          playbackId: asset?.playback_ids?.[0]?.id,
          chapterId
        }
      })
    }

    return NextResponse.json(chapter, {status: 200});
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({error: error.issues}, {status: 400})
    }

    return new NextResponse("Somethin went wrong", {status: 500})
  }
}

export async function DELETE(req:Request, { params }: { params: { courseId: string, chapterId: string } }) {
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

    if (chapter.videoUrl) {
      const existingVideoData = await db.muxData.findFirst({
        where: {
          chapterId,
        }
      })

      if (existingVideoData) {
        await Video.Assets.del(existingVideoData.assetId!);
        await db.muxData.delete({
          where: {
            id: existingVideoData.id,
          }
        })
      }
    }

    const deletedChapter = await db.chapter.delete({
      where: {
        id: chapterId,
      }
    });

    const chapters = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      }
    })

    if (chapters.length === 0) {
      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        }
      })
    }

    return NextResponse.json(deletedChapter, { status: 200 });
    
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({error: error.issues}, {status: 400})
    }

    return new NextResponse("Somethin went wrong", {status: 500})
  }
}
