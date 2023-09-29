"use client";

import { UserButton } from "@clerk/nextjs";
import React from "react";

type NavbarRoutesProps = {};

const NavbarRoutes: React.FC<NavbarRoutesProps> = () => {
  return (
    <div className="flex gap-x-2 ml-auto">
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
};
export default NavbarRoutes;
