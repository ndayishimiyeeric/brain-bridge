import React from "react";
import SideBar from "./_components/side-bar";
import Navbar from "./_components/navbar";

type layoutProps = {
  children: React.ReactNode;
};

const layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <div className="w-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex flex-col w-56 h-full fixed inset-y-0 z-50">
        <SideBar />
      </div>
      <div className="md:pl-56 pt-[80px]">{children}</div>
    </div>
  );
};
export default layout;
