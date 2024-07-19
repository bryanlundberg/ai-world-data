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
  units?: string;
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
    hideYAxis: false,
    labels: false,
  });

  return (
    <>
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
            </Bar>
          </BarChart>
        </ChartContainer>

        <CardDescription className="mt-14 mb-3 flex items-end justify-between">
          <p>Style options</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">View data</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>RAW JSON</DialogTitle>
              </DialogHeader>

              <pre className="bg-black w-full p-5 text-xs overflow-y-auto max-h-96">
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
            title="Hide labels"
            description="Removes the names displayed on the bars."
          />
        </div>
      </CardContent>
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
