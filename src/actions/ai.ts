import { defineAction, ActionError } from "astro:actions";
import { client, tokenize } from "../lib/ai";

export const aiActions = {
  getTokens: defineAction({
    handler: async (input, context) => {
      try {
        return tokenize(input.text);
      } catch (error) {
        console.warn(error);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal Server Error",
        });
      }
    },
  }),
  ask: defineAction({
    handler: async (input, context) => {
      try {
        console.log(input);
        const completion = await client.chat.completions.create({
          messages: [
            {
              role: "system",
              content: "Markdown optional",
            },
            {
              role: "user",
              content: input.text,
            },
          ],
          model: "gpt-4o-mini",
          max_tokens: 5000,
        });
        console.log(completion.choices[0]);
        return {
          message: completion.choices[0].message.content,
          remainingTokens: 5,
          roomid: 1,
          error: false,
        };
      } catch (error) {
        console.warn(error);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal Server Error",
        });
      }
    },
  }),
};
