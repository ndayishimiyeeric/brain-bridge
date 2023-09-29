import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type LogoProps = {
  width?: number;
  height?: number;
};

const Logo: React.FC<LogoProps> = ({ width = 30, height = 30 }) => {
  return (
    <div className="flex items-center ">
      <Image
        src="/logo.svg"
        alt="Brain Bridge logo"
        width={width}
        height={height}
        className="select-none"
      />
    </div>
  );
};

export default Logo;
