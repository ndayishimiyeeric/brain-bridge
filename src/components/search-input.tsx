"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks";
import qs from "query-string";

type Props = {};

function SearchInput({}: Props) {
  const [value, setValue] = React.useState("");
  const debouncedValue = useDebounce(value);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: debouncedValue,
          categoryId: currentCategoryId,
        },
      },
      { skipNull: true, skipEmptyString: true },
    );
    router.push(url);
  }, [debouncedValue, currentCategoryId, pathname, router]);

  return (
    <div>
      <Input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full md:w-[300px] rounded-md focus-visible:ring-slate-200"
      />
    </div>
  );
}

export default SearchInput;
