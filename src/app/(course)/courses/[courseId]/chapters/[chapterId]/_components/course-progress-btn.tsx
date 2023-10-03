"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "@/hooks";
import toast from "react-hot-toast";
import axios from "axios";

interface CourseProgressBtnProps {
  chapterId: string;
  courseId: string;
  nextChapterId?: string;
  isCompleted?: boolean;
}

function CourseProgressBtn({
  chapterId,
  courseId,
  nextChapterId,
  isCompleted,
}: CourseProgressBtnProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  const Icon = isCompleted ? XCircle : CheckCircle;

  const handleComplete = async () => {
    try {
      setIsLoading(true);

      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        { isCompleted: !isCompleted },
      );

      if (!isCompleted && !nextChapterId) {
        confetti.OnOpen();
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      toast.success("Chapter progress updated");
      router.refresh();
    } catch (error: any) {
      toast.error("Something went wrong, please try again later", error.status);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={isCompleted ? "outline" : "success"}
      className="w-full md:w-auto"
      onClick={handleComplete}
      disabled={isLoading}
    >
      {isCompleted ? "Not Completed" : "Mark as completed"}
      <Icon className="w-4 h-4 ml-2" />
    </Button>
  );
}

export default CourseProgressBtn;
