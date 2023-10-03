import { auth, UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getDashboardCourses } from "@/lib/actions";
import CoursesList from "@/components/courses-list";
import InfoCard from "@/app/(dashboard)/(root)/_components/info-card";
import { CheckCircle, Clock } from "lucide-react";

export default async function Dashboard() {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const { completedCourses, coursesInProgress } =
    await getDashboardCourses(userId);

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          label="Courses In progress"
          icon={Clock}
          numItems={coursesInProgress.length}
        />
        <InfoCard
          label="Completed courses"
          icon={CheckCircle}
          numItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
