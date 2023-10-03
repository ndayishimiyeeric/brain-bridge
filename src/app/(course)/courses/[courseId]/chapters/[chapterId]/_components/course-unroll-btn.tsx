import React from "react";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  courseId: string;
  price: number;
};

function CourseUnrollBtn({ courseId, price }: Props) {
  return (
    <Button className="w-full md:w-auto" size="sm">
      Unroll for {formatPrice(price)}
    </Button>
  );
}

export default CourseUnrollBtn;
