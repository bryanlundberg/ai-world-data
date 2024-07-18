import { AISettings } from "@/ts/Interfaces";
import { AIProviders, Models } from "@/ts/Types";
import { useEffect, useState } from "react";

export default function useAISettings() {
  const [googleProviderKey, setGoogleProviderKey] = useState("");

  const [AISettings, setAISettings] = useState<AISettings>({
    model: undefined,
    provider: undefined,
  });

  const handleChangeModel = (model: Models) => {
    setAISettings({ ...AISettings, model: model });
  };

  const handleChangeKey = (newKey: string) => {
    setGoogleProviderKey(newKey);
  };

  useEffect(() => {
    setAISettings({
      ...AISettings,
    });
  }, []);

  return {
    AISettings,
    handleChangeModel,
    handleChangeKey,
    googleProviderKey,
  };
}
