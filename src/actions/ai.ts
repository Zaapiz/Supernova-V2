import { defineAction, ActionError } from "astro:actions";
import { client, tokenize, storeInDB } from "../lib/ai";
import { getRoom, renameRoom, deleteRoom } from "../lib/account";

export const aiActions = {
  getTokens: defineAction({
    handler: async (input) => {
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
        let roomid = null;
        if (userid) {
          const id = await storeInDB(userid, input.roomid, chat);
          if (id) {
            roomid = id.toString();
          }
        }
        return {
          message: completion.choices[0].message.content,
          remainingTokens: 5,
          roomid: roomid,
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
  getChats: defineAction({
    handler: async (input, context) => {
      try {
        const userid = await context.session?.get("userid");
        const accountData = await getRoom(userid, input.roomid);
        if (accountData) {
          return accountData.rooms[0].chats;
        } else {
          return { error: "Account data not found" };
        }
      } catch (error) {
        console.warn(error);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal Server Error",
        });
      }
    },
  }),
  renameRoom: defineAction({
    handler: async (input, context) => {
      try {
        const userid = await context.session?.get("userid");
        await renameRoom(userid, input.roomid, input.roomname)
        return "success";
      } catch (error) {
        console.warn(error);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal Server Error",
        });
      }
    },
  }),
  deleteRoom: defineAction({
    handler: async (input, context) => {
      try {
        const userid = await context.session?.get("userid");
        await deleteRoom(userid, input.roomid)
        return "success";
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
