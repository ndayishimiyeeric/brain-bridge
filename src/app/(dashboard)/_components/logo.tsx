import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type LogoProps = {
  width?: number;
  height?: number;
  brandClassName?: string;
};

const Logo: React.FC<LogoProps> = ({
  width = 30,
  height = 30,
  brandClassName,
}) => {
  return (
    <div className="flex items-center ">
      <Image
        src="/logo.svg"
        alt="Brain Bridge logo"
        width={width}
        height={height}
        className="select-none"
      />
      <span
        className={cn(
          "text-[#3584e4] select-none text-lg tracking-tighter leading-tight -mb-2",
          brandClassName
        )}
      >
        Brainbridge
      </span>
    </div>
  );
};

export default Logo;
