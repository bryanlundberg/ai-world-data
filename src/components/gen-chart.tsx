"use client";

import { Gem } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AIPromptSettings, AISettings } from "@/ts/Interfaces";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";

import { Button } from "./ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";

interface data {
  key: string;
  value: number;
  units: string;
}

export function GenChart({
  data,
  chartConfigs = {
    value: {
      label: "#",
    },
  },
  promptSettings,
  aiSettings,
}: {
  data: data[];
  chartConfigs?: any; // :V
  promptSettings: AIPromptSettings;
  aiSettings: AISettings;
}) {
  const [config, setConfig] = useState({
    hideXAxis: true,
    hideYAxis: true,
    labels: false,
    values: false,
  });

  chartConfigs.value.label = data[0].units || "#";

  return (
    <>
      <div data-test="successful-chart">
        <CardHeader>
          <CardTitle>
            {promptSettings.metadata1.charAt(0).toUpperCase() +
              promptSettings.metadata1.slice(1)}{" "}
            with {promptSettings.comparison} {promptSettings.metadata2} - 2024
          </CardTitle>
          <CardDescription className="flex items-center gap-1">
            <Gem size={12} /> Generated with {aiSettings.model}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfigs}>
            <BarChart
              accessibilityLayer
              data={data}
              layout="vertical"
              margin={{
                left: 0,
                right: 50,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="key"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 7)}
                hide={config.hideYAxis}
              />
              <XAxis dataKey="value" type="number" hide={config.hideXAxis} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar dataKey="value" layout="vertical" fill="#BCBCBD" radius={5}>
                {config.labels && (
                  <LabelList
                    dataKey="key"
                    position="insideLeft"
                    offset={8}
                    className="fill-[--color-label]"
                    fontSize={12}
                  />
                )}
                {config.values && (
                  <LabelList
                    dataKey="value"
                    position="right"
                    offset={8}
                    className="gray"
                    fontSize={12}
                  />
                )}
              </Bar>
            </BarChart>
          </ChartContainer>

          <CardDescription className="mt-14 mb-3 flex items-end justify-between">
            <p data-test="chart-options-title">Appearance</p>
            <Dialog>
              <DialogTrigger data-test="button-view-data" asChild>
                <Button variant="outline">View data</Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-md"
                data-test="dialog-raw-data"
              >
                <DialogHeader>
                  <DialogTitle>RAW JSON</DialogTitle>
                </DialogHeader>

                <pre
                  className="dark:bg-black bg-neutral-100 w-full p-5 text-xs overflow-y-auto max-h-96"
                  data-test="raw-data-code"
                >
                  {JSON.stringify(data, null, 2)}
                </pre>
              </DialogContent>
            </Dialog>
          </CardDescription>
          <Separator className=" mb-5" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CheckboxChartOption
              onClick={() =>
                setConfig((config) => ({
                  ...config,
                  hideXAxis: !config.hideXAxis,
                }))
              }
              defaultChecked={config.hideXAxis}
              id="show-x-axis"
              title="Hide X Axis Scale"
              description="Remove reference on the Y axis."
            />
            <CheckboxChartOption
              onClick={() =>
                setConfig((config) => ({
                  ...config,
                  hideYAxis: !config.hideYAxis,
                }))
              }
              defaultChecked={config.hideYAxis}
              id="show-y-axis"
              title="Hide Y Axis Scale"
              description="Remove reference on the Y axis."
            />
            <CheckboxChartOption
              onClick={() =>
                setConfig((config) => ({
                  ...config,
                  labels: !config.labels,
                }))
              }
              defaultChecked={config.labels}
              id="show-labels"
              title="Show labels"
              description="Display the names inside the bars."
            />
            <CheckboxChartOption
              onClick={() =>
                setConfig((config) => ({
                  ...config,
                  values: !config.values,
                }))
              }
              defaultChecked={config.values}
              id="show-values"
              title="Show values"
              description="Display the values at the right of the bars."
            />
          </div>
        </CardContent>
      </div>
    </>
  );
}

function CheckboxChartOption({ title, description, id, ...rest }: any) {
  return (
    <>
      <div className="items-top flex space-x-2">
        <Checkbox id={id} {...rest} />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor={id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {title}
          </label>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </>
  );
}
