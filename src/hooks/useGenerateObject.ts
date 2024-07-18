import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import { useEffect, useState } from "react";
import { generateText } from "ai";

export default function useGenerateObject() {
  const [key, setKey] = useState();

  useEffect(() => {
    // if (key) {
    //   const google = createGoogleGenerativeAI({
    //     apiKey: "AIzaSyBfG-8AtDeABoEtugLuPfvp2NzWdWqnw00",
    //   });
    // }

    async function name() {
      try {
        const google = createGoogleGenerativeAI({
          baseURL:
            "https://corsproxy.io/?https://generativelanguage.googleapis.com/v1beta/models/",
          apiKey: "AIzaSyBfG-8AtDeABoEtugLuPfvp2NzWdWqnw00",
        });

        const { text } = await generateText({
          model: google("gemini-1.5-flash-latest"),
          prompt: "Write a vegetarian lasagna recipe for 4 people.",
        });

        console.log(text);
        return text;
      } catch (error) {
        console.log(error);
      }
    }

    name();
  }, []);
}
