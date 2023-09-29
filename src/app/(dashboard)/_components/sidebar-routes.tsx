"use client";

import React from "react";
import { Compass, Layout } from "lucide-react";
import SidebarItem from "./sidebar-item";

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

const SidebarRoutes: React.FC<SidebarRoutesProps> = () => {
  const routes = guestRoutes;
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
