"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import SearchInput from "./search-input";
import { isTeacher } from "@/lib/actions";

type NavbarRoutesProps = {};

const NavbarRoutes: React.FC<NavbarRoutesProps> = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { userId } = useAuth();

  const isTeacherMode = pathname?.startsWith("/teacher");
  const isStudentMode = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";
  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherMode || isStudentMode ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : (
          <a
            href={`mailto:${process.env.REQUEST_TEACHER_MODE_EMAIL}`}
            target="_blank"
          >
            <Button size="sm" variant="ghost">
              Become a teacher
            </Button>
          </a>
        )}
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </>
  );
};
export default NavbarRoutes;
