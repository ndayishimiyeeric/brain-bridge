"use client";

import React from "react";
import { Loader2, LockIcon } from "lucide-react";
import MuxPlayer from "@mux/mux-player-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks";
import toast from "react-hot-toast";
import axios from "axios";

type Props = {
  chapterId: string;
  title: string;
  courseId: string;
  nextChapterId: string;
  playbackId: string;
  isLocked: boolean;
  completeOnEnd: boolean;
};

const VideoPlayer = ({
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  playbackId,
  title,
  courseId,
}: Props) => {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const confetti = useConfettiStore();

  const handleOnEnded = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: true,
          },
        );
      }

      if (!nextChapterId) {
        confetti.OnOpen();
      }

      toast.success("Progress updated");
      router.refresh();

      if (nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative aspect-video">
      {!isLocked && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 rounded-md">
          <Loader2 className="w-8 h-8 animate-spin text-secondary" />
        </div>
      )}

      {isLocked && (
        <div className="absolute inset-0 items-center justify-center bg-slate-800 flex flex-col gap-y-2 text-secondary">
          <LockIcon className="w-8 h-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}

      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn("rounded-md", !isPlaying && "hidden")}
          onCanPlay={() => setIsPlaying(true)}
          onEnded={handleOnEnded}
          autoPlay
          playbackId={playbackId}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
