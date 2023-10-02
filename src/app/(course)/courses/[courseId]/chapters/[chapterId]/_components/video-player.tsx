"use client";

import React from "react";
import { Loader2, LockIcon } from "lucide-react";
import MuxPlayer from "@mux/mux-player-react";
import { cn } from "@/lib/utils";

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
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <div className="relative aspect-video">
      {!isLocked && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
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
          className={cn(!isPlaying && "hidden")}
          onCanPlay={() => setIsPlaying(true)}
          onEnded={() => {}}
          autoPlay
          playbackId={playbackId}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
