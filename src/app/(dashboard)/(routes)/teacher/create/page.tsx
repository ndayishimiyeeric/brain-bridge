"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormDescription,
  FormLabel,
  FormItem,
} from "@/components/ui/form";
import {
  CreateCourseSchema,
  CreateCourseSchemaType,
} from "@/lib/varidators/course";
import Link from "next/link";

type Props = {};

function CreateCoursePage({}: Props) {
  const router = useRouter();
  const form = useForm<CreateCourseSchemaType>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const habdleSubmit = async (values: CreateCourseSchemaType) => {
    try {
      const { data } = await axios.post("/api/courses", values);
      router.push(`/teacher/courses/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto h-full p-6 md:items-center md:justify-center">
      <div>
        <h1 className="text-2xl">Name your course</h1>
        <p className="text-sm text-slate-600">
          Don&apos;t worry this can be changed later
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(habdleSubmit)}
            className="mt-8 space-y-8"
          >
            <FormField
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel htmlFor="title">Course title</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="eg. Advanced C++"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you teach in this course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
              name="title"
            />

            <div className="flex items-center gap-x-2">
              <Link href="/teacher/courses">
                <Button variant="ghost" type="button">
                  Cancel
                </Button>
              </Link>
              <Button
                className="bg-[#0369a1] hover:bg-[#0369a1]/80 active:bg-[#0369a1]/80"
                type="submit"
                disabled={isSubmitting || !isValid}
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default CreateCoursePage;
