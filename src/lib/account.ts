import evalidator from "email-validator";
import { account } from "./db";
import { ObjectId } from "mongodb";

export async function getAccountByUser(user: string) {
  const query = evalidator.validate(user)
    ? { email: new RegExp(`^${user}$`, "i") }
    : { username: new RegExp(`^${user}$`, "i") };
  return (await account.findOne(query)) || "none";
}

export async function getAccountById(id: string | number | ObjectId) {
  if(!(id instanceof ObjectId)) id = new ObjectId(id);
  return await account.findOne({ _id: id });
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
