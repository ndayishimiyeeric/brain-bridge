import { Chapter, Course, UserProgress } from "@prisma/client";

type CourseChapterProgressProps = {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progress: number;
};

export default CourseChapterProgressProps;
