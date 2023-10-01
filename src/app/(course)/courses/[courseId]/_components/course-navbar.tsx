import React from "react";
import NavbarRoutes from "@/components/navbar-routes";
import { CourseChapterProgressProps } from "@/types";
import CourseMobileMenu from "@/app/(course)/courses/[courseId]/_components/course-mobile-menu";

function CourseNavbar({ course, progress }: CourseChapterProgressProps) {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileMenu course={course} progress={progress} />
      <NavbarRoutes />
    </div>
  );
}

export default CourseNavbar;
