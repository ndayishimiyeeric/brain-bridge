"use client";

import React from "react";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";

type Props = {
  courseId: string;
  price: number;
};

function CourseUnrollBtn({ courseId, price }: Props) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleUnroll = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`/api/courses/${courseId}/checkout`);
      window.location.assign(data.url);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      className="w-full md:w-auto"
      size="sm"
      onClick={handleUnroll}
      disabled={isLoading}
    >
      Unroll for {formatPrice(price)}
    </Button>
  );
}

export default CourseUnrollBtn;
