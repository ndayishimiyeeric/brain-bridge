"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type SidebarItemProps = {
  icon: LucideIcon;
  href: string;
  label: string;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  href,
  label,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const handleClick = () => {
    router.push(href);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex items-center gap-x-2 text-slate-500 hover:text-slate-500 hover:bg-slate-300/20 text-sm font-[500] pl-6 transition-all",
        isActive &&
          "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={20}
          className={cn("text-slate-500", isActive && "text-sky-700")}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};
export default SidebarItem;
