import React from "react";
import MobileNavbar from "./mobile-navbar";
import NavbarRoutes from "@/components/navbar-routes";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileNavbar />
      <NavbarRoutes />
    </div>
  );
};
export default Navbar;
