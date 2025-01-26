import evalidator from "email-validator";
import { account } from "./db";
import { ObjectId } from "mongodb";

interface Chat {
  ai: boolean;
  text: string;
}

interface Room {
  roomid: ObjectId;
  name: string;
  chats: Chat[];
}

interface Account {
  _id: ObjectId;
  email: string;
  username: string;
  password: string;
  tokens: number;
  rooms: Room[];
}

export async function getAccountByUser(user: string) {
  const query = evalidator.validate(user)
    ? { email: new RegExp(`^${user}$`, "i") }
    : { username: new RegExp(`^${user}$`, "i") };
  return (await account.findOne(query)) || "none";
}

export async function getAccountById(
  id: string | ObjectId,
  projection?: Partial<Record<keyof Account, 1 | 0>>
) {
  if (!(id instanceof ObjectId)) id = new ObjectId(id);
  return await account.findOne({ _id: id }, { projection: projection });
}

export async function getRoom(
  userid: string | ObjectId,
  roomid: string | ObjectId
) {
  if (!(userid instanceof ObjectId)) userid = new ObjectId(userid);
  if (!(roomid instanceof ObjectId)) roomid = new ObjectId(roomid);
  return await account.findOne(
    {
      _id: userid,
      "rooms.roomid": roomid,
    },
    { projection: { "rooms.$": 1 } }
  );
}

export async function signupValidate(
  email: string,
  username: string,
  password: string
) {
  if (email.length > 1000) return "Email too long";
  else if (!evalidator.validate(email)) return "Invalid Email";
  else if (username.length > 50) return "Username too long";
  else if (username.includes("@")) return "@ symbol not allowed in username";
  else if (password.length > 1000) return "Password too long";
  else if (
    await account.findOne({
      email: new RegExp(`^${email}$`, "i"),
    })
  )
    return "Email Already in Use";
  else if (
    await account.findOne({
      username: new RegExp(`^${username}$`, "i"),
    })
  )
    return "Username Taken";
  else {
    return false;
  }
}
