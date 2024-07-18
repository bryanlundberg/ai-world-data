import { GenChart } from "./gen-chart";
import Navbar from "./navbar";
import { Card, CardContent, CardDescription } from "./ui/card";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { nouns } from "@/data/nouns";
import { locations } from "@/data/locations";
import { Lock } from "lucide-react";

import useAISettings from "@/hooks/useAISettings";
import { AIProviders, Models } from "@/ts/Types";
import { AII } from "@/ts/Interfaces";
import { getKey, setKey } from "@/lib/utils";
import usePromptSettings from "@/hooks/usePromptSettings";

export default function Playground() {
  // const [promptSettings, setPromptSettings] = useState({
  //   metadata1: undefined,
  //   comparison: undefined,
  //   metadata2: undefined,
  //   dataSetSize: 5,
  // });

  const { AISettings, handleChangeKey, handleChangeModel, googleProviderKey } =
    useAISettings();
  const { promptSettings, handlePrompt, setPromptSettings } =
    usePromptSettings();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="border-t"></div>
        <div className="flex w-full max-w-screen-xl gap-3 p-3 mx-auto">
          {/* ChartZone */}
          <Card className="w-full h-full">
            <GenChart />
          </Card>
          {/* Options */}

          <div>
            <Card className="p-3 h-fit w-96">
              <CardDescription>IA Settings</CardDescription>
              <div className="flex flex-col gap-3 mt-3 ">
                {/* IA model */}
                <Label htmlFor="model">Model</Label>
                <Select defaultValue={AISettings.model}>
                  <SelectTrigger id="model" className="w-full">
                    <SelectValue placeholder="Choose a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Google generative</SelectLabel>
                      <SelectItem value={"gemini-10-pro"}>
                        Gemini 1.0 Pro{" "}
                      </SelectItem>
                      <SelectItem value="gemini-15-flash">
                        Gemini 1.5 Flash{" "}
                      </SelectItem>
                      <SelectItem value="gemini-15-pro">
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

            <div className="mt-3"></div>

            <Card className="p-3">
              <CardDescription>Prompt configuration</CardDescription>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePrompt();
                }}
                className="flex flex-col gap-3 mt-3 "
              >
                <Label htmlFor="">Metadata 1:</Label>
                <Select
                  onValueChange={(e) =>
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

                <Label htmlFor="">Comparison (with):</Label>
                <Select
                  onValueChange={(e) =>
                    setPromptSettings((data) => ({ ...data, comparison: e }))
                  }
                  defaultValue="most"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue id="comparison" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"most"}>Most</SelectItem>
                    <SelectItem value={"least"}>Least</SelectItem>
                  </SelectContent>
                </Select>

                <Label htmlFor="">Metadata 2:</Label>
                <Select
                  onValueChange={(e) =>
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

                <Label htmlFor="">Dataset size:</Label>
                <Select
                  defaultValue="5"
                  onValueChange={(e) =>
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

                <Button
                  disabled={
                    promptSettings.metadata1 === "" ||
                    promptSettings.metadata2 === ""
                  }
                >
                  Launch
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
