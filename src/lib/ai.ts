import OpenAI from "openai";
import { encoding_for_model } from "tiktoken";
import { account } from "./db";
import { ObjectId } from "mongodb";

const enc = encoding_for_model("gpt-4o-mini");

export const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export function tokenize(text: string) {
  const messages = `role: system content: Markdown optional role: user content: ${text};`;
  return enc.encode(messages).length * 20;
}

export async function storeInDB(
  accid: string | number | ObjectId,
  roomid: string | number | ObjectId | undefined,
  chats: { ai: boolean; text: string }[]
) {
  console.log(chats);
  if (!(accid instanceof ObjectId)) accid = new ObjectId(accid);
  if (roomid === undefined) {
    roomid = new ObjectId();
    await account.updateOne(
      { _id: accid },
      {
        // @ts-ignore
        $push: {
          rooms: { roomid: roomid, name: "Unnamed Room", chats: chats },
        },
      }
    );
    return roomid;
  } else {
    if (!(roomid instanceof ObjectId)) roomid = new ObjectId(roomid);
    await account.updateOne(
      { _id: accid, "rooms.roomid": new ObjectId(roomid) },
      // @ts-ignore
      { $push: { "rooms.$.chats": { $each: chats } } }
    );
    return false;
  }
}
