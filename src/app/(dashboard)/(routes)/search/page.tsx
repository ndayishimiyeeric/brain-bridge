import { db } from "@/lib/db";
import React from "react";
import Categories from "./_components/categories";
import SearchInput from "@/components/search-input";

type pageProps = {};

const page = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <>
      <div className="container px-6 pt-6 block md:hidden md:mb-0">
        <SearchInput />
      </div>

      <div className="container py-6">
        <Categories items={categories} />
      </div>
    </>
  );
};
export default page;
