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
      throw new Error("Not provider found");
    }

    const apiKey = window.localStorage.getItem(provider);

    if (!apiKey || apiKey === "" || apiKey.length <= 20) {
      throw new Error("Not API key");
    }

    let response = "";

    const systemMessage = `always generate only an array, based on most realistic information in case you don't have it complete fields. Its necessary that it has a length of ${length}. Result must follow this structure JSON object: {key: String, value: Number (complete number, e.g: 1000000 not 1M or similar), units: String (relation, e.g: Countries most millionaires - relationship it's people) }. Finally don't include any kind of other text characters.`;

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
