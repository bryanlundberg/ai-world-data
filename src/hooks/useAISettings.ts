import { ai } from "@/data/ai";
import { AISettings } from "@/ts/Interfaces";
import { Models } from "@/ts/Types";
import { useEffect, useState } from "react";

export default function useAISettings() {
  const [googleProviderKey, setGoogleProviderKey] = useState("");

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

  const handleChangeKey = (newKey: string) => {
    setGoogleProviderKey(newKey);
  };

  useEffect(() => {
    setGoogleProviderKey(
      window.localStorage.getItem("google-generative") || ""
    );
  }, []);
  useEffect(() => {
    console.log(AISettings);
  }, [AISettings]);

  return {
    AISettings,
    handleChangeModel,
    handleChangeKey,
    googleProviderKey,
  };
}
