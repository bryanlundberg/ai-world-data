"use client";

import Navbar from "@/components/navbar";
import { Card, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { nouns } from "@/data/nouns";
import { locations } from "@/data/locations";
import { Lock } from "lucide-react";

import useAISettings from "@/hooks/useAISettings";
import usePromptSettings from "@/hooks/usePromptSettings";

import { setKey } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { generateGoogleResponse } from "@/lib/generateGoogleResponse";
import LoadingChart from "@/components/loading-chart";
import ChartHoldingState from "@/components/chart-holding-state";
import { GenChart } from "@/components/gen-chart";
import { useToast } from "@/components/ui/use-toast";

export default function Playground() {
  const { AISettings, handleChangeKey, handleChangeModel, googleProviderKey } =
    useAISettings();
  const { promptSettings, setPromptSettings } = usePromptSettings();

  const [data, setData] = useState<any>([]);

  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="border-t"></div>
        <div className="flex flex-col-reverse lg:flex-row w-full max-w-screen-xl gap-3 p-3 mx-auto">
          {/* ChartZone */}
          <Card className="w-full h-full">
            {/* If its loading */}
            {isLoading ? (
              <LoadingChart />
            ) : // If theres not data
            !data || data.length === 0 ? (
              <ChartHoldingState />
            ) : (
              // If there are data
              <GenChart
                data={data}
                promptSettings={promptSettings}
                aiSettings={AISettings}
              />
            )}
          </Card>
          {/* Options */}

          <div className="flex flex-col gap-3 lg:w-96">
            <Card className="p-3 flex-1 lg:flex-none">
              <CardDescription>IA settings</CardDescription>
              <div className="flex flex-col gap-3 mt-3 ">
                {/* IA model */}
                <Label htmlFor="model">Model</Label>
                <Select
                  defaultValue={AISettings.model}
                  onValueChange={(e) => handleChangeModel(e as any)}
                >
                  <SelectTrigger id="model" className="w-full">
                    <SelectValue placeholder="Choose a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Google generative</SelectLabel>
                      <SelectItem value={"gemini-1.0-pro"} disabled>
                        <Lock className="inline w-3 h-3 mb-1"></Lock> Gemini 1.0
                        Pro{" "}
                      </SelectItem>
                      <SelectItem value="gemini-1.5-flash">
                        Gemini 1.5 Flash{" "}
                      </SelectItem>
                      <SelectItem value="gemini-1.5-pro">
                        Gemini 1.5 Pro{" "}
                      </SelectItem>
                      <SelectItem value="gemini-227b" disabled>
                        <Lock className="inline w-3 h-3 mb-1"></Lock> Gemini 2
                        27B
                      </SelectItem>
                      <SelectItem value="gemini-29b" disabled>
                        <Lock className="inline w-3 h-3 mb-1"></Lock> Gemini 2
                        9B
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {/* Manage api keys */}
                <Label htmlFor="show-secrets">API Keys</Label>
                <Dialog>
                  <DialogTrigger id="show-secrets" asChild>
                    <Button variant={"outline"}>Show secrets</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>API Keys</DialogTitle>
                      <DialogDescription>
                        A single place to manage all your secret keys.
                      </DialogDescription>
                      <div className="flex flex-col gap-2 py-3">
                        <Label htmlFor="google-generative">
                          Google generative
                        </Label>
                        <Input
                          id="google-generative"
                          placeholder="e.g 6f24710e-f770-4bed-8542-eec420759d64"
                          defaultValue={googleProviderKey}
                          onChange={(e) => {
                            setKey(e.target.value, "google-generative");
                            handleChangeKey(e.target.value);
                          }}
                        />
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>

            {/* <div className="mt-3"></div> */}

            <Card className="p-3 flex-1 lg:flex-none">
              <CardDescription>Prompt configuration</CardDescription>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3 mt-3 ">
                <div className="space-y-3">
                  <Label htmlFor="">Metadata 1:</Label>
                  <Select
                    onValueChange={(e: any) =>
                      setPromptSettings((data) => ({ ...data, metadata1: e }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        id="metadata1"
                        placeholder="Choose an option"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => {
                        return (
                          <SelectItem value={location.key} key={location.key}>
                            {location.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  {" "}
                  <Label htmlFor="">Comparison (with):</Label>
                  <Select
                    onValueChange={(e: any) =>
                      setPromptSettings((data) => ({ ...data, comparison: e }))
                    }
                    defaultValue={promptSettings.comparison}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue id="comparison" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"most"}>Most</SelectItem>
                      <SelectItem value={"fewer"}>Fewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  {" "}
                  <Label htmlFor="">Metadata 2:</Label>
                  <Select
                    onValueChange={(e: any) =>
                      setPromptSettings((data) => ({ ...data, metadata2: e }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        id="metadata2"
                        placeholder="Choose an option"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {nouns.map((noun) => {
                        return (
                          <SelectItem value={noun.key} key={noun.key}>
                            {noun.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  {" "}
                  <Label htmlFor="">Dataset size:</Label>
                  <Select
                    defaultValue={promptSettings.size}
                    onValueChange={(e: any) =>
                      setPromptSettings((data) => ({ ...data, size: e }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue id="size" placeholder="Choose a model" />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 6, 7, 8, 9, 10, 15, 20].map((number) => {
                        return (
                          <SelectItem value={number.toString()} key={number}>
                            {number}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                className="w-full mt-3"
                disabled={
                  promptSettings.metadata1 === "" ||
                  promptSettings.metadata2 === ""
                }
                onClick={async () => {
                  try {
                    setIsLoading(true);
                    const response = await generateGoogleResponse({
                      apiKey:
                        window.localStorage.getItem("google-generative") || "",
                      model: AISettings.model || "gemini-1.5-pro",
                      metadata1: promptSettings.metadata1,
                      comparison: promptSettings.comparison,
                      metadata2: promptSettings.metadata2,
                      length: promptSettings.size,
                    });

                    if (response) {
                      setData([...response]);
                    }
                  } catch (error) {
                    if (error instanceof Error) {
                      toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: error.message,
                      });
                    } else {
                      toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "An unknown error occurred.",
                      });
                    }
                  } finally {
                    setIsLoading(false);
                  }
                }}
              >
                Launch
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
