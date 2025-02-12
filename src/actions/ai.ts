import { defineAction, ActionError } from "astro:actions";
import { client, storeInDB } from "../lib/ai";
import { getRoom, renameRoom, deleteRoom } from "../lib/account";

export const aiActions = {
  ask: defineAction({
    handler: async (input, context) => {
      try {
        const userid = await context.session?.get("userid");

        const chatBackend = [
          {
            role: "developer",
            content: "Markdown optional",
          },
        ];

        if (userid && input.roomid) {
          const room = await getRoom(userid, input.roomid);
          if (room) {
            const chatsToAdd = room.rooms[0].chats.slice(-10);
            chatsToAdd.forEach((idk) => {
              chatBackend.push(idk);
            });
          }
        }
        chatBackend.push({
          role: "user",
          content: input.text,
        });

        const completion = await client.chat.completions.create({
          // @ts-ignore
          messages: chatBackend,
          model: "gpt-4o-mini",
          max_tokens: 5000,
        });
        console.log(completion.choices[0]);

        const chat = [{ role: "user", content: input.text }];

        chat.push({
          role: "assistant",
          content: completion.choices[0].message.content || "",
        });
        let roomid = null;
        if (userid) {
          const id = await storeInDB(userid, input.roomid, chat);
          if (id) {
            roomid = id.toString();
          }
        }
        return {
          message: completion.choices[0].message.content,
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
        await renameRoom(userid, input.roomid, input.roomname);
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
        await deleteRoom(userid, input.roomid);
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
