import { AIProviders, Models } from "@/ts/Types";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function generateResponse({
  model,
  metadata1,
  comparison,
  metadata2,
  length,
  provider,
}: {
  model: Models;
  metadata1: string;
  comparison: string;
  metadata2: string;
  length: string;
  provider: AIProviders;
}) {
  try {
    if (!provider) {
      throw new Error("Not provider received");
    }

    if (!model) {
      throw new Error("Not model received");
    }

    const apiKey = window.localStorage.getItem(provider);

    if (!apiKey || apiKey === "" || apiKey.length <= 20) {
      throw new Error("Not API key");
    }

    let response = "";

    const systemMessage = `Generate an array of JSON objects based on the most realistic and accurate information available. In cases where complete data is not available, provide the best possible estimates while ensuring the information is as precise as possible. The array must consist of exactly ${length} elements, with each element formatted as a JSON object. Each JSON object must follow this detailed structure: "key" should be a string representing the key; "value" must be a complete number, represented in full (e.g., 1000000 rather than 1M or any other abbreviation); and "units" should be a string that clearly describes the relationship (e.g., "Countries with the most millionaires - relationship is people"). It is crucial that the output strictly adheres to this format, including only the array itself and no additional text or characters, to ensure the result is precise and correctly formatted.`;

    const promptMessage = `${metadata1} ${comparison} ${metadata2}`;

    if (provider === "google-generative") {
      const google = createGoogleGenerativeAI({
        baseURL: "https://generativelanguage.googleapis.com/v1beta/models/",
        apiKey: apiKey,
      });
      const { text } = await generateText({
        model: google(model),
        prompt: promptMessage,
        system: systemMessage,
      });
      response = text;
    } else if (provider === "groq") {
      const groq = createOpenAI({
        baseURL: "https://api.groq.com/openai/v1",
        apiKey: apiKey,
      });

      const { text } = await generateText({
        model: groq(model),
        prompt: promptMessage,
        system: systemMessage,
      });

      response = text;
    } else if (provider === "openai") {
      const openai = createOpenAI({
        apiKey: apiKey,
        compatibility: "strict",
      });
      const { text } = await generateText({
        model: openai(model),
        prompt: promptMessage,
        system: systemMessage,
      });
      response = text;
    }

    if (!response) throw new Error("Failed load resource");

    const startIndex = response.indexOf("[");

    const endIndex = response.lastIndexOf("]") + 1;

    if (startIndex === -1 || endIndex === -1) {
      return [];
    }

    const jsonString = response.slice(startIndex, endIndex);

    const jsonArray = JSON.parse(jsonString);

    const formattedArray = jsonArray.map((item: any) => ({
      key: item.key,
      value: Number(item.value),
      units: item.units,
    }));

    return formattedArray;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
