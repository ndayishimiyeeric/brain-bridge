import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getChapter } from "@/lib/actions";
import { Banner } from "@/components/banner";
import VideoPlayer from "./_components/video-player";
import CourseUnrollBtn from "./_components/course-unroll-btn";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { File } from "lucide-react";

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

      <div className="flex flex-col max-w-7xl mx-auto pb-20 overflow-x-hidden">
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

        <div className="p-4 flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
          {purchase ? (
            <div></div>
          ) : (
            <CourseUnrollBtn courseId={courseId} price={course.price!} />
          )}
        </div>
        <Separator />
        <div>
          <Preview value={chapter.description!} />
        </div>
        {!!attachments.length && (
          <>
            <Separator />
            <div className="p-4">
              {attachments.map((attachment, index) => (
                <a
                  href={attachment.url}
                  key={attachment.id}
                  target="_blank"
                  className="w-full flex items-center p-3 bg-sky-200 text-sky-700 border rounded-md hover:underline"
                >
                  <File className="w-6 h-6 mr-2" />
                  <p className="line-clamp-1">{attachment.name}</p>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChapterPage;
