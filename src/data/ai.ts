import { AII } from "@/ts/Interfaces";

export const ai: AII[] = [
  {
    model: "gemini-1.0-pro",
    name: "Gemini 1.0 Pro",
    provider: "google-generative",
  },
  {
    model: "gemini-1.5-flash",
    name: "Gemini 1.5 Flash",
    provider: "google-generative",
  },
  {
    model: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    provider: "google-generative",
  },
  {
    model: "gemini-227b",
    name: "Gemini 2 27B",
    provider: "google-generative",
  },
  {
    model: "gemini-29b",
    name: "Gemini 2 9B",
    provider: "google-generative",
  },
  {
    model: "llama3-8b-8192",
    name: "LLaMA3 8b",
    provider: "groq",
  },
  {
    model: "llama3-70b-8192",
    name: "LLaMA3 70b",
    provider: "groq",
  },
  {
    model: "mixtral-8x7b-32768",
    name: "Mixtral 8x7b",
    provider: "groq",
  },
  {
    model: "gpt-3.5-turbo",
    name: "GPT 3.5 Turbo",
    provider: "openai",
  },
  {
    model: "gpt-4",
    name: "GPT 4",
    provider: "openai",
  },
  {
    model: "gpt-4-turbo",
    name: "GPT 4 Turbo",
    provider: "openai",
  },
  {
    model: "gpt-4o",
    name: "GPT 4o",
    provider: "openai",
  },
];
