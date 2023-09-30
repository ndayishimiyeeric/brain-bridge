"use client";

import React from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, Course } from "@prisma/client";

import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  CreateChapterSchema,
  CreateChapterSchemaType,
  UpdateCourseSchema,
  UpdateCourseSchemaType,
} from "@/lib/varidators/course";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import ChaptersList from "./chapter-list";

type Props = {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
};

const ChapterForm = ({ initialData, courseId }: Props) => {
  const router = useRouter();
  const [IsCreating, steIsCreating] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);

  const toggleCreating = () => {
    steIsCreating((prev) => !prev);
  };

  const form = useForm<CreateChapterSchemaType>({
    resolver: zodResolver(CreateChapterSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const handleSubmit = async (values: UpdateCourseSchemaType) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter created", { duration: 5000 });
      toggleCreating();
      router.refresh();
    } catch (error: any) {
      if (error.response.status === 400) {
        toast.error(error.response.data.error);
      }
      toast.error("Something went wrong");
    }
  };

  const handleOnReorder = async (items: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: items,
      });
      toast.success("Chapters reordered", { duration: 5000 });
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleOnEdit = async (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  };

  return (
    <div className="relative mt-6 bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute bg-slate-700/20 h-full w-full top-0 right-0 rounded-sm flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course chapters
        <Button variant="ghost" onClick={toggleCreating}>
          {IsCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2  " />
              Add chapter
            </>
          )}
        </Button>
      </div>

      {IsCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              name="title"
              control={form.control}
              render={({ field, formState }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting || !IsCreating}
                      {...field}
                      placeholder="eg. Introduction"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2 justify-end">
              <Button
                className="bg-[#0369a1] hover:bg-[#0369a1]/80"
                type="submit"
                disabled={isSubmitting || !isValid}
              >
                Create
              </Button>
            </div>
          </form>
        </Form>
      )}

      {!IsCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "text-slate-500 italic"
          )}
        >
          {!initialData.chapters.length && "No chapters"}
          <ChaptersList
            items={initialData.chapters || []}
            onEdit={handleOnEdit}
            onReorder={handleOnReorder}
          />
        </div>
      )}
      {!IsCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reoder the chapters
        </p>
      )}
    </div>
  );
};

export default ChapterForm;
