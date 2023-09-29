import React from "react";
import { Menu, Table2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideBar from "./side-bar";

type MobileNavbarProps = {};

const MobileNavbar: React.FC<MobileNavbarProps> = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Table2 />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <SideBar />
      </SheetContent>
    </Sheet>
  );
};
export default MobileNavbar;
