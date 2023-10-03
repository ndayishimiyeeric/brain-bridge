import { db } from "../db";

const getProgress = async (
  userId: string,
  courseId: string,
): Promise<number> => {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    const validChapterIds = publishedChapters.map(({ id }) => id);

    const completedChaptersCount = await db.userProgress.count({
      where: {
        userId,
        chapterId: {
          in: validChapterIds,
        },
        isCompleted: true,
      },
    });

    return (completedChaptersCount / publishedChapters.length) * 100;
  } catch (error) {
    console.error("Failed to get user progress", error);
    return 0;
  }
};

export default getProgress;
