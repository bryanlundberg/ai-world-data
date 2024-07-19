import { AIPromptSettings } from "@/ts/Interfaces";
import { useState } from "react";

export default function usePromptSettings() {
  const [promptSettings, setPromptSettings] = useState<AIPromptSettings>({
    metadata1: "",
    metadata2: "",
    comparison: "most",
    size: "5",
  });

  return {
    promptSettings,
    setPromptSettings,
  };
}
