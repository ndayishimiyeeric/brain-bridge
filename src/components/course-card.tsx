import React from "react";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CourseWithProgressWithCategory } from "@/lib/actions/get-courses";
import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/utils";
import CourseProgress from "@/components/course-progress";

type Props = {
  item: CourseWithProgressWithCategory;
};

function CourseCard({ item }: Props) {
  return (
    <Link href={`/courses/${item.id}`}>
      <div className="group h-full p-3 border rounded-lg hover:shadow-sm transition overflow-hidden">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            alt={item.title}
            src={item.imageUrl!}
            className="object-cover"
            fill
          />
        </div>

        <div className="flex flex-col pt-2">
          <div className="font-medium text-lg md:text-base group-hover:text-sky-700 transition line-clamp-2">
            {item.title}
          </div>
          <p className="text-xs text-muted-foreground">{item.category?.name}</p>

          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center text-slate-500 gap-x-1">
              <IconBadge icon={BookOpen} size="sm" />
              <span className="">
                {item.chapters.length}{" "}
                {item.chapters.length === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>

          {item.progress !== null ? (
            <CourseProgress
              value={item.progress}
              variant={item.progress === 100 ? "success" : "default"}
              size="sm"
            />
          ) : (
            <div>
              {item.price === null || item.price === 0 ? (
                <p className="text-base md:text-sm font-medium text-green-700 italic">
                  Free
                </p>
              ) : (
                <p className="text-base md:text-sm font-medium text-slate-700">
                  {formatPrice(item.price)}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
