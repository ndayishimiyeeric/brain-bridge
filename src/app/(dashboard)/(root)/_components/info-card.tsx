import React from "react";
import { LucideIcon } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";

type Props = {
  label: string;
  icon: LucideIcon;
  variant?: "default" | "success";
  numItems: number;
};

function InfoCard({ label, icon: Icon, numItems, variant }: Props) {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <IconBadge icon={Icon} variant={variant} />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-gray-500 text-sm">
          {numItems} {numItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  );
}

export default InfoCard;
