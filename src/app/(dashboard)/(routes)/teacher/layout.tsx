import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { isTeacher } from "@/lib/actions";

type Props = {
  children: React.ReactNode;
};

async function TeacherLayout({ children }: Props) {
  const { userId } = auth();

  if (!isTeacher(userId)) {
    return redirect("/");
  }

  return <>{children}</>;
}

export default TeacherLayout;
