"use client";

import React from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { UpdateCourseSchemaType } from "@/lib/varidators/course";
import { FileUpload } from "@/components/file-upload";

type Props = {
  initialData: Course;
  courseId: string;
};

const ImageForm = ({ initialData, courseId }: Props) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSubmit = async (values: UpdateCourseSchemaType) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated successfully", { duration: 5000 });
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
        Course image
        <Button variant="ghost" onClick={toggleEditing}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2  " />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="w-10 h-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              src={initialData.imageUrl}
              alt="upload"
              fill
              className="object-cover rounded-md"
            />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                handleSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-sm text-muted-foreground mt-4">
            Recommended ratio 16:9
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageForm;
