import { CartesianGrid, LabelList, Line, LineChart } from "recharts";

import { CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { browser: "other", visitors: 40000, fill: "var(--color-other)" },
  { browser: "chromes", visitors: 120000, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 90000, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 200000, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 300000, fill: "var(--color-edge)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-2))",
  },
  chromes: {
    label: "Heroku",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Netlify",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Vercel",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "GitHub Pages",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Render",
    color: "hsl(var(--chart-5))",
  },
};

export function ChartHome() {
  return (
    <>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] max-w-96">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 24,
              left: 24,
              right: 24,
            }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  nameKey="visitors"
                  hideLabel
                />
              }
            />
            <Line
              dataKey="visitors"
              type="natural"
              stroke="var(--color-visitors)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-visitors)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                dataKey="browser"
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Project deployment popularity- Source OpenAI
        </div>
      </CardFooter>
    </>
  );
}
