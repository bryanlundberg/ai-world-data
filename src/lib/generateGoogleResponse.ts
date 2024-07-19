import { Models } from "@/ts/Types";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

export async function generateGoogleResponse({
  apiKey,
  model,
  metadata1,
  comparison,
  metadata2,
  length,
}: {
  apiKey: string;
  model: Models;
  metadata1: string;
  comparison: string;
  metadata2: string;
  length: string;
}) {
  try {
    const google = createGoogleGenerativeAI({
      baseURL: "https://generativelanguage.googleapis.com/v1beta/models/",
      apiKey: apiKey,
    });

    const { text } = await generateText({
      model: google(model),
      prompt: `${metadata1} ${comparison} ${metadata2}`,
      system: `always generate only an array, based on most realistic information in case you don't have it complete fields. Its necessary that it has a length of ${length}. Result must follow this structure javascript Object: {key: String, value: Number (complete number, e.g: 1000000 not 1M or similar), units: String (relation, e.g: Countries most millionaires - relationship it's people) }. Finally don't include any kind of other text characters.`,
    });

    if (!text) throw new Error("Failed load resource");

    const startIndex = text.indexOf("[");

    const endIndex = text.lastIndexOf("]") + 1;

    if (startIndex === -1 || endIndex === -1) {
      return [];
    }

    const jsonString = text.slice(startIndex, endIndex);

    const jsonArray = JSON.parse(jsonString);

    const formattedArray = jsonArray.map((item: any) => ({
      key: item.key,
      value: Number(item.value),
      units: item.units,
    }));

    console.log(formattedArray);

    return formattedArray;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
