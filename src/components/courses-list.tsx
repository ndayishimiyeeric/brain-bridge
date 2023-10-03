import React from "react";
import { CourseWithProgressWithCategory } from "@/lib/actions/get-courses";
import CourseCard from "@/components/course-card";

interface Props {
  items: CourseWithProgressWithCategory[];
}

const CoursesList = ({ items }: Props) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
        {items.map((item, index) => (
          <CourseCard key={index} item={item} />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  );
};

export default CoursesList;
