import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getAnalytics } from "@/lib/actions";
import DataCard from "@/app/(dashboard)/(routes)/teacher/analytics/_components/data-card";
import Chart from "@/app/(dashboard)/(routes)/teacher/analytics/_components/chart";

type Props = {};

const AnalyticsPage = async (props: Props) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { data, totalSales, totalRevenue } = await getAnalytics(userId);
  return (
    <div className="p-6 space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard label="Total Revenue" value={totalRevenue} shouldFormat />
        <DataCard label="Total Sales" value={totalSales} />
      </div>
      <Chart data={data} />
    </div>
  );
};

export default AnalyticsPage;
