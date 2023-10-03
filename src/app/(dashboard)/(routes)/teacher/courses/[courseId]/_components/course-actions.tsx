"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useConfettiStore } from "@/hooks";

type Props = {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
};

const CourseActions = ({ disabled, courseId, isPublished }: Props) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Course deleted", { duration: 5000 });
      router.refresh();
      router.push(`/teacher/courses`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublishAndUnpublish = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Course unpublished", { duration: 5000 });
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Course published", { duration: 5000 });
        confetti.OnOpen();
      }
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={handlePublishAndUnpublish}
        disabled={disabled}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>

      <ConfirmModal onConfirm={handleDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default CourseActions;
