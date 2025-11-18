import { LanguageModel } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import * as fs from "fs";
import * as path from "path";
export interface Model {
  name: string;
  model: LanguageModel;
}

export interface CustomProviderConfig {
  name: string;
  modelId: string;
  provider?: "openai" | "google"; // Provider type: openai-compatible or google
  baseURL?: string; // Only for openai-compatible providers
  apiKey?: string;
  headers?: Record<string, string>;
}

// Function to load custom providers from JSON file
function loadCustomProviders(): Model[] {
  const customModels: Model[] = [];

  try {
    const configPath = path.join(
      __dirname,
      "providers",
      "custom-providers.json",
    );

    // Check if the config file exists
    if (!fs.existsSync(configPath)) {
      console.log(
        "No custom providers configuration file found at:",
        configPath,
      );
      return customModels;
    }

    const configData = fs.readFileSync(configPath, "utf8");
    const customProviderConfigs: CustomProviderConfig[] =
      JSON.parse(configData);

    for (const config of customProviderConfigs) {
      try {
        let model: LanguageModel;

        if (config.provider === "google") {
          // Use Google Gemini API
          const google = createGoogleGenerativeAI({
            apiKey: config.apiKey || process.env.GEMINI_API_KEY,
          });
          model = google(config.modelId, {
            useThinkingLevel: "high",
          });
        } else {
          // Default to OpenAI-compatible API (OpenRouter, etc.)
          const provider = createOpenAI({
            baseURL: config.baseURL,
            apiKey: config.apiKey || process.env.OPENROUTER_API_KEY,
            headers: config.headers,
          });
          model = provider(config.modelId);
        }

        customModels.push({
          name: config.name,
          model,
        });

        console.log(`Loaded custom provider: ${config.name}`);
      } catch (error) {
        console.warn(`Failed to create custom provider ${config.name}:`, error);
      }
    }
  } catch (error) {
    console.warn("Failed to load custom providers configuration:", error);
  }

  return customModels;
}

const baseModels: Model[] = [
  {
    name: "OpenAI GPT-5",
    model: "openai/gpt-5",
  },
  {
    name: "Anthropic Claude 4 Sonnet",
    model: "anthropic/claude-4-sonnet",
  },
  {
    name: "Google Gemini 2.5 Flash",
    model: "google/gemini-2.5-flash",
  },
  {
    name: "XAI Grok 4",
    model: "xai/grok-4",
  },
];

// Load only custom providers (gpt-5.1-codex)
export const MODELS: Model[] = [...loadCustomProviders()];
