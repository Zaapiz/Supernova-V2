import OpenAI from 'openai'
import { account } from './db'
import { ObjectId } from 'mongodb'

export const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function storeInDB(
  accid: string | ObjectId,
  roomid: string | ObjectId | undefined,
  chats: { role: string; content: string }[],
) {
  if (!(accid instanceof ObjectId)) accid = new ObjectId(accid)
  if (roomid === null) {
    roomid = new ObjectId()
    await account.updateOne(
      { _id: accid },
      {
        // @ts-ignore
        $push: {
          rooms: { roomid: roomid, name: 'Unnamed Room', chats: chats },
        },
      },
    )
    return roomid
  } else {
    if (!(roomid instanceof ObjectId)) roomid = new ObjectId(roomid)
    const accountDoc = await account.findOne(
      { _id: accid, 'rooms.roomid': roomid },
      // @ts-ignore
      { 'rooms.$': 1 },
    )
    if (accountDoc) {
      const room = accountDoc.rooms[0]
      if (room.chats.length <= 100) {
        await account.updateOne(
          { _id: accid, 'rooms.roomid': roomid },
          // @ts-ignore
          { $push: { 'rooms.$.chats': { $each: chats } } },
        )
      }
    }
    return false
  }
}
