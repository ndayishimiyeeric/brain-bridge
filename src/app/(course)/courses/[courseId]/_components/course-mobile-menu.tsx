import React from "react";
import { Table2 } from "lucide-react";
import { CourseChapterProgressProps } from "@/types";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CourseSidebar from "./course-sidebar";

const CourseMobileMenu = ({ course, progress }: CourseChapterProgressProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Table2 />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72">
        <CourseSidebar course={course} progress={progress} />
      </SheetContent>
    </Sheet>
  );
};

export default CourseMobileMenu;
