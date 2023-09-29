"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

type NavbarRoutesProps = {};

const NavbarRoutes: React.FC<NavbarRoutesProps> = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isTeacherMode = pathname?.startsWith("/teacher");
  const isStudentMode = pathname?.includes("/chapter");
  return (
    <div className="flex gap-x-2 ml-auto">
      {isTeacherMode || isStudentMode ? (
        <Link href="/">
          <Button size="sm" variant="ghost">
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <Button size="sm" variant="ghost">
            Teacher mode
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
};
export default NavbarRoutes;
