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

export default function Playground() {
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
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Google generative</SelectLabel>
                      <SelectItem value="light">Gemini v2 Pro </SelectItem>
                    </SelectGroup>

                    <SelectGroup>
                      <SelectLabel>OpenAI</SelectLabel>
                      <SelectItem value="none" disabled={true}>
                        GPT-3.5
                      </SelectItem>
                      <SelectItem value="none" disabled={true}>
                        GPT-4
                      </SelectItem>
                      <SelectItem value="none" disabled={true}>
                        GPT-4o
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {/* Manage api keys */}
                <Dialog>
                  <DialogTrigger>
                    <div className="flex flex-col items-start gap-3">
                      <Label htmlFor="">API Keys</Label>
                      <Button className="w-full" variant={"secondary"}>
                        Open management
                      </Button>
                    </div>
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
                          placeholder="6f24710e-f770-4bed-8542-eec420759d64"
                        />
                      </div>

                      <Button>Guardar</Button>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>

            <div className="mt-3"></div>

            <Card className="p-3">
              <CardDescription>Prompt</CardDescription>

              <div className="flex flex-col gap-3 mt-3 ">
                <Label htmlFor="">Metadata 1</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a model" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => {
                      return (
                        <SelectItem value={location.key}>
                          {location.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                <Label htmlFor="">Metadata 2</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a model" />
                  </SelectTrigger>
                  <SelectContent>
                    {nouns.map((noun) => {
                      return (
                        <SelectItem value={noun.key}>{noun.name}</SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                <Label htmlFor=""># Results</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a model" />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 6, 7, 8, 9, 10, 15, 20].map((number) => {
                      return (
                        <SelectItem value={number.toString()}>
                          {number}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                <Button>Launch</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
