import { useEffect, useState } from "react";

export default function usePromptSettings() {
  const [promptSettings, setPromptSettings] = useState({
    metadata1: "",
    metadata2: "",
    comparison: "most",
    size: "5",
  });

  const handlePrompt = async () => {};

  useEffect(() => {
    console.log(promptSettings);
  }, [promptSettings]);

  return {
    promptSettings,
    handlePrompt,
    setPromptSettings,
  };
}
