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
import { Lock, SquareArrowOutUpRight } from "lucide-react";

import useAISettings from "@/hooks/useAISettings";
import usePromptSettings from "@/hooks/usePromptSettings";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { generateResponse } from "@/lib/generateResponse";
import LoadingChart from "@/components/loading-chart";
import ChartHoldingState from "@/components/chart-holding-state";
import { GenChart } from "@/components/gen-chart";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { DataAIResponse } from "@/ts/Interfaces";

export default function Playground() {
  const { AISettings, handleChangeModel, providerKeys, setProviderKeys } =
    useAISettings();
  const { promptSettings, setPromptSettings } = usePromptSettings();

  const [data, setData] = useState<DataAIResponse[]>([]);

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
            <Card
              className="p-3 flex-1 lg:flex-none"
              data-test="card-ai-settings"
            >
              <CardDescription>AI settings</CardDescription>
              <div className="flex flex-col gap-3 mt-3 ">
                {/* IA model */}
                <Label htmlFor="model">Model</Label>
                <Select onValueChange={(e) => handleChangeModel(e as any)}>
                  <SelectTrigger
                    id="model"
                    className="w-full"
                    data-test="select-model"
                  >
                    <SelectValue placeholder="Choose a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup data-test="group-google-generative">
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

                    {/* Groq */}
                    <SelectGroup data-test="group-groq">
                      <SelectLabel>Groq</SelectLabel>
                      <SelectItem value={"llama3-8b-8192"}>
                        LLaMA3 8b
                      </SelectItem>
                      <SelectItem value="llama3-70b-8192">
                        LLaMA3 70b
                      </SelectItem>
                      <SelectItem value="mixtral-8x7b-32768">
                        Mixtral 8x7b
                      </SelectItem>
                    </SelectGroup>

                    {/* OpenAI */}
                    <SelectGroup data-test="group-openai">
                      <SelectLabel>OpenAI (Experimental)</SelectLabel>
                      <SelectItem value={"gpt-3.5-turbo"}>
                        GPT 3.5 Turbo{" "}
                      </SelectItem>
                      <SelectItem value="gpt-4" disabled>
                        <Lock className="inline w-3 h-3 mb-1"></Lock> GPT 4{" "}
                      </SelectItem>
                      <SelectItem value="gpt-4-turbo" disabled>
                        <Lock className="inline w-3 h-3 mb-1"></Lock> GPT 4
                        Turbo{" "}
                      </SelectItem>
                      <SelectItem value="gpt-4o" disabled>
                        <Lock className="inline w-3 h-3 mb-1"></Lock> GPT 4o
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {/* Manage api keys */}
                <Label htmlFor="show-secrets">API Keys</Label>
                <Dialog>
                  <DialogTrigger
                    data-test="secrets-trigger-modal"
                    id="show-secrets"
                    asChild
                  >
                    <Button variant={"outline"}>Edit</Button>
                  </DialogTrigger>
                  <DialogContent data-test="dialog-secret-keys">
                    <DialogHeader>
                      <DialogTitle>API Keys</DialogTitle>
                      <DialogDescription>
                        A single place to manage all your secret keys.
                      </DialogDescription>

                      <ApiKeyProvider
                        data-test={"provider-google-generative"}
                        placeholder="AIzaSyBfG-8AtDeABoEtugLuPfvp2NzWdWqn"
                        website="https://aistudio.google.com/app/apikey"
                        name="Google generative"
                        provider="google-generative"
                        onChange={(e: any) => {
                          window.localStorage.setItem(
                            "google-generative",
                            e.target.value
                          );

                          setProviderKeys((state) => ({
                            ...state,
                            "google-generative": e.target.value,
                          }));
                        }}
                        defaultValue={providerKeys["google-generative"]}
                      />
                      <ApiKeyProvider
                        data-test={"provider-groq"}
                        placeholder="GEb8d6SgiShJUmNJZWGdyb3FY6yIFWx1nuUguoN3e0nYyOP8Q"
                        website="https://console.groq.com/keys"
                        name="Groq"
                        provider="groq"
                        onChange={(e: any) => {
                          window.localStorage.setItem("groq", e.target.value);
                          setProviderKeys((state) => ({
                            ...state,
                            groq: e.target.value,
                          }));
                        }}
                        defaultValue={providerKeys.groq}
                      />
                      <ApiKeyProvider
                        data-test={"provider-openai"}
                        placeholder="eggUbZZfru5HBTJ4uGlXT3BlbkFJKaGF4Abiokun5AmYqphn"
                        website="https://platform.openai.com/api-keys"
                        name="OpenAI"
                        provider="openai"
                        onChange={(e: any) => {
                          window.localStorage.setItem("openai", e.target.value);
                          setProviderKeys((state) => ({
                            ...state,
                            openai: e.target.value,
                          }));
                        }}
                        defaultValue={providerKeys.openai}
                      />
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>

            {/* <div className="mt-3"></div> */}

            <Card
              className="p-3 flex-1 lg:flex-none"
              data-test="card-prompt-configuration"
            >
              <CardDescription>Prompt configuration</CardDescription>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3 mt-3 ">
                <div className="space-y-3">
                  <Label htmlFor="">Metadata 1:</Label>
                  <Select
                    onValueChange={(e: any) =>
                      setPromptSettings((data) => ({ ...data, metadata1: e }))
                    }
                  >
                    <SelectTrigger
                      className="w-full"
                      data-test="select-metadata1"
                    >
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
                    <SelectTrigger
                      className="w-full"
                      data-test="select-comparison"
                    >
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
                    <SelectTrigger
                      className="w-full"
                      data-test="select-metadata2"
                    >
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
                    <SelectTrigger className="w-full" data-test="select-size">
                      <SelectValue id="size" placeholder="Choose a size" />
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
                data-test="button-launch"
                className="w-full mt-3"
                disabled={
                  promptSettings.metadata1 === "" ||
                  promptSettings.metadata2 === "" ||
                  !AISettings.provider
                }
                onClick={async () => {
                  try {
                    setIsLoading(true);
                    const response = await generateResponse({
                      model: AISettings.model,
                      metadata1: promptSettings.metadata1,
                      comparison: promptSettings.comparison,
                      metadata2: promptSettings.metadata2,
                      length: promptSettings.size,
                      provider: AISettings.provider,
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

function ApiKeyProvider({
  website,
  name,
  placeholder,
  provider,
  ...rest
}: any) {
  return (
    <>
      <div className="flex flex-col gap-2 py-3">
        <Label htmlFor={provider}>
          {name}{" "}
          <Link
            className="text-blue-600 hover:text-blue-500 inline-flex items-center gap-1"
            href={website}
            // href="https://aistudio.google.com/app/apikey"
            target="_blank"
          >
            Get API Key <SquareArrowOutUpRight size={12} />
          </Link>
        </Label>
        <Input
          id={provider}
          placeholder={"e.g " + placeholder}
          {...rest}
          // defaultValue={googleProviderKey}
          // onChange={(e) => {
          //   setKey(e.target.value, "openai");
          //   handleChangeKey(e.target.value);
          // }}
        />
      </div>
    </>
  );
}
