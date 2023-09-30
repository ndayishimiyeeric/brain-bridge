"use client";

import React from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";

import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  UpdateChapterSchema,
  UpdateChapterSchemaType,
} from "@/lib/varidators/course";
import { cn } from "@/lib/utils";
import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
};

const ChapterAccessForm = ({ initialData, courseId, chapterId }: Props) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const form = useForm<UpdateChapterSchemaType>({
    resolver: zodResolver(UpdateChapterSchema),
    defaultValues: {
      isFree: Boolean(initialData?.isFree),
    },
  });

  const { isSubmitting, isValid } = form.formState;

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
        Chapter access settings
        <Button variant="ghost" onClick={toggleEditing}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2  " />
              Update settings
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.isFree && "text-slate-500 italic"
          )}
        >
          {initialData.isFree ? (
            <>This chapter is free</>
          ) : (
            <>This chapter is not free</>
          )}
        </p>
      )}

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              name="isFree"
              control={form.control}
              render={({ field, formState }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormDescription>
                      Check this if you want to make this chapter free
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2 justify-end">
              <Button
                className="bg-[#0369a1] hover:bg-[#0369a1]/80"
                type="submit"
                disabled={isSubmitting || !isValid}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ChapterAccessForm;
