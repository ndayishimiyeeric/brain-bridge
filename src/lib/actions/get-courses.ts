import { Course, Category } from "@prisma/client";
import { getProgress } from "@/lib/actions";
import { db } from "@/lib/db";

export type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          select: {
            id: true,
          },
          where: {
            isPublished: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          if (course.purchases.length === 0) {
            return {
              ...course,
              progress: null,
            };
          }

          const progress = await getProgress(userId, course.id);

          return {
            ...course,
            progress,
          };
        }),
      );

    return coursesWithProgress;
  } catch (error) {
    console.error("Failed to get courses", error);
    return [];
  }
};

export default getCourses;
