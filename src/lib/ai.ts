import OpenAI from "openai";
import { encodingForModel } from "js-tiktoken";

export const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});