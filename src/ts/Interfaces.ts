import { AIProviders, Models } from "./Types";

export interface AISettings {
  model: Models | undefined;
  provider: AIProviders;
}

export interface AII {
  model: Models;
  provider: AIProviders;
  name: string;
}

export interface PromptSettings {
  metadata1: string;
  metadata2: string;
  comparison: string;
  size: string;
  ok: boolean;
}
