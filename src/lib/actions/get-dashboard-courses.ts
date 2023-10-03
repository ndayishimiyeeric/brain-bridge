import { Category, Chapter, Course } from "@prisma/client";
import { db } from "@/lib/db";
import { getProgress } from "@/lib/actions/index";

type CourseWithProgressWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};

type GetDashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
};

const getDashboardCourses = async (
  userId: string,
): Promise<GetDashboardCourses> => {
  try {
    const purchasesCourses = await db.purchase.findMany({
      where: {
        userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });

    const courses = purchasesCourses.map(
      (purchase) => purchase.course,
    ) as CourseWithProgressWithCategory[];

    for (let course of courses) {
      course.progress = await getProgress(userId, course.id);
    }

    const completedCourses = courses.filter(
      (course) => course.progress === 100,
    );
    const coursesInProgress = courses.filter(
      (course) => (course.progress ?? 0) < 100,
    );

    return {
      completedCourses,
      coursesInProgress,
    };
  } catch (e) {
    console.log(e);
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
};

export default getDashboardCourses;
