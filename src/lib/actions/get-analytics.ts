import { Course, Purchase } from "@prisma/client";
import { db } from "@/lib/db";

type PurchaseWithCourse = Purchase & {
  course: Course;
};

const getAnalytics = async (userId: string) => {
  try {
    const purchases = await db.purchase.findMany({
      where: {
        userId,
      },
      include: {
        course: true,
      },
    });

    const groupedEarnings = earningsByCourse(purchases);

    const data = Object.entries(groupedEarnings).map(
      ([courseTitle, total]) => ({
        name: courseTitle,
        total,
      }),
    );

    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    const totalSales = purchases.length;

    return {
      data,
      totalRevenue,
      totalSales,
    };
  } catch (error) {
    console.log(error);

    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
};

const earningsByCourse = (purchases: PurchaseWithCourse[]) => {
  const earnings: { [courseTitle: string]: number } = {};

  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!earnings[courseTitle]) {
      earnings[courseTitle] = 0;
    }
    earnings[courseTitle] += purchase.course.price!;
  });

  return earnings;
};

export default getAnalytics;
