import { ai } from "@/data/ai";
import { AISettings } from "@/ts/Interfaces";
import { Models } from "@/ts/Types";
import { useEffect, useState } from "react";

export default function useAISettings() {
  const [providerKeys, setProviderKeys] = useState({
    "google-generative": "",
    groq: "",
    openai: "",
  });

  const [AISettings, setAISettings] = useState<AISettings>({
    model: undefined,
    provider: undefined,
  });

  const handleChangeModel = (model: Models) => {
    ai.forEach((item) => {
      if (item.model === model) {
        return setAISettings({
          ...AISettings,
          model: model,
          provider: item.provider,
        });
      }
    });
  };

  useEffect(() => {
    setProviderKeys((state) => ({
      "google-generative":
        window.localStorage.getItem("google-generative") || "",
      groq: window.localStorage.getItem("groq") || "",
      openai: window.localStorage.getItem("openai") || "",
    }));
  }, []);

  useEffect(() => {
    console.log(AISettings);
  }, [AISettings]);

  return {
    AISettings,
    handleChangeModel,
    setProviderKeys,
    providerKeys,
  };
}
