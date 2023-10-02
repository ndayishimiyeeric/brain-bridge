import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getChapter } from "@/lib/actions";
import { Banner } from "@/components/banner";
import VideoPlayer from "./_components/video-player";

type ChapterPageProps = {
  params: {
    courseId: string;
    chapterId: string;
  };
};

const ChapterPage = async ({ params }: ChapterPageProps) => {
  const { userId } = auth();
  const { courseId, chapterId } = params;

  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    nextChapter,
    attachments,
    purchase,
    muxData,
    course,
    userProgress,
  } = await getChapter({ userId, courseId, chapterId });
  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !purchase && !chapter.isFree;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner label="Completed" variant="success" />
      )}

      {isLocked && (
        <Banner label="You need to purchase this chapter" variant="warning" />
      )}

      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={chapterId}
            title={chapter.title}
            courseId={courseId}
            nextChapterId={nextChapter?.id!}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;
