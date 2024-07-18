import { AIProviders, Models } from "@/ts/Types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getKey(model: Models, provider: AIProviders): string {
  if (!provider || !model) return "";
  return window.localStorage.getItem(provider) || "";
}

export function setKey(newKey: string, provider: AIProviders) {
  if (!provider || !newKey) return;
  return window.localStorage.setItem(provider, newKey);
}
