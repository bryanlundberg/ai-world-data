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

    const systemMessage = `Generate an array of JSON objects based on the most realistic and accurate information available. In cases where complete data is not available, provide the best possible estimates while ensuring the information is as precise as possible. The array must consist of exactly ${length} elements, with each element formatted as a JSON object. Each JSON object must follow this detailed structure: "key" type string representing the name; "value" type number (Priorice get the full value before change to other scale variation) and "units" should be a string that clearly describes the relationship max 30 characters length. All results must be on same units. It is crucial that the output strictly adheres to this format, including only the array itself and no additional information, to ensure the result is precise and correctly formatted. Information must be estimated to year 2024.`;

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

    if (!response) throw new Error("Failed load resource.");

    const startIndex = response.indexOf("[");

    const endIndex = response.lastIndexOf("]") + 1;

    if (startIndex === -1 || endIndex === -1) {
      throw new Error("Failed to find JSON array in the response.");
    }

    const jsonString = response.slice(startIndex, endIndex);

    let jsonArray;
    try {
      jsonArray = JSON.parse(jsonString);
    } catch (error) {
      throw new Error("Failed to parse JSON. Invalid JSON format.");
    }

    if (!Array.isArray(jsonArray)) {
      throw new Error("AI did not return an array. Please try another query.");
    }

    const formattedArray = jsonArray.map((item) => {
      if (
        typeof item !== "object" ||
        !("key" in item) ||
        !("value" in item) ||
        !("units" in item)
      ) {
        throw new Error("Invalid data structure coming from AI.");
      }

      const value = Number(item.value);
      if (isNaN(value)) {
        throw new Error(
          "Whoops AI did not return the correct data structure, sorry try again."
        );
      }

      return {
        key: item.key,
        value: value,
        units: item.units,
      };
    });

    return formattedArray;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
