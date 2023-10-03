import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
  variant?: "default" | "success";
  size?: "default" | "sm";
  value: number;
}

const colorVariants = {
  default: "text-sky-700",
  success: "text-emerald-700",
};

const sizeVariants = {
  default: "text-sm",
  sm: "text-xs",
};

function CourseProgress({ variant, size, value }: CourseProgressProps) {
  return (
    <div>
      <Progress className="h-2" value={value} variant={variant} />
      <p
        className={cn(
          "font-medium mt-2 text-sky-700",
          colorVariants[variant || "default"],
          sizeVariants[size || "default"],
        )}
      >
        {Math.round(value || 0)} % completed
      </p>
    </div>
  );
}

export default CourseProgress;
