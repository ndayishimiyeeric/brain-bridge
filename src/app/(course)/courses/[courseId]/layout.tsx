import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import CourseSidebar from "./_components/course-sidebar";
import { getProgress } from "@/lib/actions";
import CourseNavbar from "@/app/(course)/courses/[courseId]/_components/course-navbar";

type Props = {
  children: React.ReactNode;
  params: {
    courseId: string;
  };
};

const CourseLayout = async ({ children, params }: Props) => {
  const { userId } = auth();
  const { courseId } = params;

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findFirst({
    where: {
      id: courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const progress = await getProgress(userId, courseId);

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar course={course} progress={progress} />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSidebar course={course} progress={progress} />
      </div>
      <main className="md:pl-80 pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default CourseLayout;
