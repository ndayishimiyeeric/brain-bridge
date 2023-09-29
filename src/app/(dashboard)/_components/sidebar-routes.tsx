"use client";

import React, { use } from "react";
import { BarChart, Compass, Layout, List } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";

type SidebarRoutesProps = {};

const guestRoutes = [
  {
    icon: Layout,
    href: "/",
    label: "Dashboard",
  },
  {
    icon: Compass,
    href: "/search",
    label: "Browse",
  },
];

const teacherRoutes = [
  {
    icon: List,
    href: "/teacher/courses",
    label: "Courses",
  },
  {
    icon: BarChart,
    href: "/teacher/analytics",
    label: "Analytics",
  },
];

const SidebarRoutes: React.FC<SidebarRoutesProps> = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map((item, index) => (
        <SidebarItem
          key={index}
          icon={item.icon}
          href={item.href}
          label={item.label}
        />
      ))}
    </div>
  );
};
export default SidebarRoutes;
