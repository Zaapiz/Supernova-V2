import { defineAction, ActionError } from "astro:actions";
import { client, tokenize, storeInDB } from "../lib/ai";

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
        const chat = [{ ai: false, text: input.text }];

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
        chat.push({ ai: true, text: completion.choices[0].message.content });
        const userid = await context.session?.get("userid");
        const roomid = await storeInDB(userid, input.roomid, chat);
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
