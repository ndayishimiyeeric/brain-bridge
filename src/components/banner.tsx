"use client";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { AlertTriangle, CheckCircleIcon } from "lucide-react";

const bannerVariants = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: "bg-yellow-200/80 border-yellow-30 text-primary",
        success: "bg-emerald-700 border-emerald-800 text-secondary",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  }
);

const iconMap: Record<string, React.ReactNode> = {
  warning: <AlertTriangle className="h-4 w-4 mr-2" />,
  success: <CheckCircleIcon className="h-4 w-4 mr-2" />,
};

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
}

export const Banner = ({ label, variant }: BannerProps) => {
  const Icon: React.ReactNode = iconMap[variant || "warning"];
  return (
    <div className={cn(bannerVariants({ variant }))}>
      {Icon}
      {label}
    </div>
  );
};
