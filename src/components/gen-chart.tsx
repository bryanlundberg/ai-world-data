"use client";

import { Gem, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { browser: "chrome", visitors: 27543325, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 2043240, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 1852537, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 17221433, fill: "var(--color-edge)" },
  { browser: "other", visitors: 9412650, fill: "var(--color-other)" },
];

const data = [
  { key: "United States", value: 2200000, units: "people" },
  { key: "China", value: 6980000, units: "people" },
  { key: "Japan", value: 3650000, units: "people" },
  { key: "Germany", value: 2760000, units: "people" },
  { key: "United Kingdom", value: 2500000, units: "people" },
  { key: "France", value: 2400000, units: "people" },
  { key: "India", value: 2360000, units: "people" },
  { key: "Canada", value: 1800000, units: "people" },
  { key: "Italy", value: 1700000, units: "people" },
  { key: "Australia", value: 1400000, units: "people" },
  { key: "South Korea", value: 930000, units: "people" },
  { key: "Spain", value: 928000, units: "people" },
  { key: "Russia", value: 900000, units: "people" },
  { key: "Switzerland", value: 780000, units: "people" },
  { key: "Netherlands", value: 750000, units: "people" },
  { key: "Brazil", value: 680000, units: "people" },
  { key: "Taiwan", value: 600000, units: "people" },
  { key: "Saudi Arabia", value: 590000, units: "people" },
  { key: "Sweden", value: 450000, units: "people" },
  { key: "Hong Kong", value: 550000, units: "people" },
];

const chartConfig2 = {
  value: {
    label: "#",
    // color: "#60a5fa",
  },
};

export function GenChart() {
  return (
    <>
      <CardHeader>
        <CardTitle>Countries with most people - 2024</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Gem size={12} /> Generated with Gemini-1.5-pro
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig2}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="key"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <XAxis dataKey="value" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="value" layout="vertical" fill="#9e9e9e" radius={5}>
              <LabelList
                dataKey="key"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </>
  );
}
