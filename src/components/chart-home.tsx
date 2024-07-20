import { CartesianGrid, LabelList, Line, LineChart } from "recharts";

import { CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  {
    key: "China",
    value: 1439323776,
    units: "people",
  },
  {
    key: "India",
    value: 1380004385,
    units: "people",
  },
  {
    key: "United States",
    value: 331449285,
    units: "people",
  },
  {
    key: "Indonesia",
    value: 273523615,
    units: "people",
  },
  {
    key: "Pakistan",
    value: 216565318,
    units: "people",
  },
];

chartData.sort((a, b) => a.value - b.value);

const chartConfig = {
  value: {
    label: "Monthly visitors",
  },
};

export function ChartHome() {
  return (
    <>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="min-h-[200px] w-96 px-4 sm:w-[600px]"
        >
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
                  nameKey="value"
                  hideLabel
                />
              }
            />
            <Line
              dataKey="value"
              type="natural"
              stroke="gray"
              strokeWidth={2}
              dot={{
                fill: "",
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
                dataKey="key"
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-center text-muted-foreground">
          Countries with most people in the world (Prompt Llama3-8b)
        </div>
      </CardFooter>
    </>
  );
}
