import OpenAI from "openai";
import { encodingForModel } from "js-tiktoken";
import { account } from "./mongo.js";
import { ObjectId } from "mongodb";
import type { Request, Response } from "express";

const enc = encodingForModel("gpt-4o-mini");
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function validateTokens(accid: ObjectId, text: string) {
  const data = await account.findOne(
    { _id: accid },
    { projection: { tokens: 1 } }
  );
  const messages = `role: system content: Markdown optional role: user content: ${text};`;
  const Token = enc.encode(messages).length * 20;
  if (data && data.tokens >= Token) return Token;
  else return -1;
}

async function removeTokens(accid: ObjectId, usedToken: number) {
  const updateResult = await account.findOneAndUpdate(
    { _id: accid },
    { $inc: { tokens: -usedToken } },
    { returnDocument: "after", projection: { tokens: 1 } }
  );
  return updateResult ? updateResult.tokens : null;
}

async function storeInDB(
  accid: ObjectId,
  roomid: string | ObjectId | undefined,
  chats: { ai: boolean; text: string }[]
) {
  console.log(chats)
  if (roomid === undefined) {
    roomid = new ObjectId();
    await account.updateOne(
      { _id: accid },
      {
        //@ts-expect-error idk mongodb types
        $push: {
          rooms: { roomid: roomid, name: "Unnamed Room", chats: chats },
        },
      }
    );
    return roomid;
  } else {
    await account.updateOne(
      { _id: accid, "rooms.roomid": new ObjectId(roomid) },
      //@ts-expect-error idk mongodb types
      { $push: { "rooms.$.chats": { $each: chats } } }
    );
    return false;
  }
}

export async function ask(req: Request, res: Response) {
  const tokens = await validateTokens(
    new ObjectId(req.session.userid),
    req.body.text
  );
  if (tokens > -1) {
    const remainingTokens = await removeTokens(
      new ObjectId(req.session.userid),
      tokens
    );
    const chat = [{ ai: false, text: req.body.text }];
    // res.send({ message: { content: req.body.text }, error: false });
    const completion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Markdown optional",
        },
        {
          role: "user",
          content: req.body.text,
        },
      ],
      model: "gpt-4o-mini",
      max_tokens: tokens + 600,
    });
    chat.push({ ai: true, text: completion.choices[0].message.content });
    const roomid = await storeInDB(
      new ObjectId(req.session.userid),
      req.body.roomid,
      chat
    );
    // console.log(completion);
    res.send({
      message: completion.choices[0].message.content,
      remainingTokens: remainingTokens,
      roomid: roomid,
      error: false,
    });
  } else {
    res.send({ error: "Not Enough Tokens" });
  }
}

export async function getChats(req: Request, res: Response) {
  const accountData = await account.findOne(
    {
      _id: new ObjectId(req.session.userid),
      "rooms.roomid": new ObjectId(req.body.roomid),
    },
    { projection: { "rooms.$": 1 } }
  );
  if (accountData) {
    res.send(accountData.rooms[0]);
  } else {
    res.send({ error: "Account data not found" });
  }
}
