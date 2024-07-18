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

    console.log({ apiKey, model, metadata1, comparison, metadata2, length });

    const { text } = await generateText({
      model: google(model),
      prompt: `${metadata1} ${comparison} ${metadata2}`,
      system: `always generate only an array, based on most realistic information in case you don't have it complete fields. Its necessary that it has a length of ${length}. Result must follow this structure javascript Object: {key: String, value: Number, units: String (relation or measure units) }. Finally don't include any kind of other text characters.`,
    });

    console.log(text);

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
    console.error(error);
  }
}
