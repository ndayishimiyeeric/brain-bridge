"use client";

import React from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  CreateCourseSchema,
  CreateCourseSchemaType,
} from "@/lib/varidators/course";

type Props = {
  initialData: {
    title: string;
  };
  courseId: string;
};

const TitleForm = ({ initialData, courseId }: Props) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const form = useForm<CreateCourseSchemaType>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const handleSubmit = async (values: CreateCourseSchemaType) => {
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
        Course title
        <Button variant="ghost" onClick={toggleEditing}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2  " />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData.title}</p>}

      {isEditing && (
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
                    <Input disabled={isSubmitting || !isEditing} {...field} />
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
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default TitleForm;
