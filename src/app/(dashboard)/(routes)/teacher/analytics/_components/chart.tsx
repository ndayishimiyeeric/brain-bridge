"use client";

import React from "react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import { Card } from "@/components/ui/card";

type Props = {
  data: {
    name: string;
    total: number;
  }[];
};

function Chart({ data }: Props) {
  return (
    <Card>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `€${value}`}
          />
          <Bar dataKey="total" fill="#0369a1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default Chart;
