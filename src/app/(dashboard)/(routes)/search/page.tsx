import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

import { db } from "@/lib/db";
import Categories from "./_components/categories";
import SearchInput from "@/components/search-input";
import { getCourses } from "@/lib/actions";
import CoursesList from "@/components/courses-list";

type SearchProps = {
  searchParams: {
    categoryId: string;
    title: string;
  };
};

const Search = async ({ searchParams }: SearchProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({ userId, ...searchParams });
  return (
    <>
      <div className="container px-6 pt-6 block md:hidden md:mb-0">
        <SearchInput />
      </div>

      <div className="container py-6 space-y-4">
        <Categories items={categories} />

        <CoursesList items={courses} />
      </div>
    </>
  );
};
export default Search;
