import OpenAI from "openai";
import { encoding_for_model } from "tiktoken";

const enc = encoding_for_model("gpt-4o-mini");

export const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export function tokenize(text: string) {
  const messages = `role: system content: Markdown optional role: user content: ${text};`;
  return enc.encode(messages).length * 20;
}