"use client";

import React from "react";
import { Category } from "@prisma/client";
import {
  FcManager,
  FcCurrencyExchange,
  FcRadarPlot,
  FcCalculator,
  FcMultipleDevices,
  FcSportsMode,
  FcMusic,
  FcMultipleCameras,
  FcEngineering,
  FcSimCardChip,
} from "react-icons/fc";
import { IconType } from "react-icons";
import CategoryItem from "./category-item";

type Props = {
  items: Category[];
};

const iconMap: Record<Category["name"], IconType> = {
  "Web Development": FcMultipleDevices,
  "Computer Science": FcSimCardChip,
  Photography: FcMultipleCameras,
  Music: FcMusic,
  Engineering: FcEngineering,
  Accounting: FcManager,
  Fitness: FcSportsMode,
  Trading: FcCurrencyExchange,
  Science: FcRadarPlot,
  Mathematics: FcCalculator,
};

function Categories({ items }: Props) {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item, index) => (
        <CategoryItem
          key={index}
          label={item.name}
          value={item.id}
          icon={iconMap[item.name]}
        />
      ))}
    </div>
  );
}

export default Categories;
