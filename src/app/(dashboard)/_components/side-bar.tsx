import React from "react";
import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

type SideBarProps = {};

const SideBar: React.FC<SideBarProps> = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo width={25} height={25} />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};
export default SideBar;
