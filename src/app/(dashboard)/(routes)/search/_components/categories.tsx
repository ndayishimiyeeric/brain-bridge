"use client";

import React from "react";
import { Category } from "@prisma/client";
import {
  FcPlus,
  FcCurrencyExchange,
  FcRadarPlot,
  FcCustomerSupport,
  FcMultipleDevices,
  FcBusinessman,
  FcReadingEbook,
  FcFilmReel,
  FcNews,
  FcCloseUpMode,
  FcCollaboration,
} from "react-icons/fc";
import { IconType } from "react-icons";
import CategoryItem from "./category-item";

type Props = {
  items: Category[];
};

const iconMap: Record<Category["name"], IconType> = {
  "Stem Education": FcRadarPlot,
  "Humanities and Arts": FcFilmReel,
  "Social Sciences": FcCollaboration,
  "Health Sciences": FcPlus,
  "Technology and IT": FcMultipleDevices,
  "Environmental Studies": FcCloseUpMode,
  "Education and Pedagogy": FcReadingEbook,
  "Law and Legal Studies": FcBusinessman,
  "Communication and Media": FcCustomerSupport,
  "Economics and Finance": FcCurrencyExchange,
  "Science and Technology Ethics": FcNews,
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
