"use client";

import React from "react";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { Pencil, PlusCircle, Video } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  UpdateChapterSchemaType,
  UpdateCourseSchemaType,
} from "@/lib/varidators/course";
import { FileUpload } from "@/components/file-upload";

type Props = {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
};

const ChapterVideoForm = ({ initialData, courseId, chapterId }: Props) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSubmit = async (values: UpdateChapterSchemaType) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Chapter updated", { duration: 5000 });
      toggleEditing();
      router.refresh();
    } catch (error: any) {
      if (error.response.status === 400) {
        toast.error(error.response.data.error);
      }
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter video
        <Button variant="ghost" onClick={toggleEditing}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2  " />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="w-10 h-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                handleSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-sm text-muted-foreground mt-4">
            Upload this chapter&apos;s video
          </div>
        </div>
      )}

      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take few minutes to load. refresh the page if the video
          does not appear.
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
