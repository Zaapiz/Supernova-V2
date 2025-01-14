import { defineConfig } from "auth-astro";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Credentials from "@auth/core/providers/credentials";
import { client } from "./src/lib/db";

export default defineConfig({
  adapter: MongoDBAdapter(client),

  providers: [
    Credentials({
      credentials: {
        user: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) { 
        console.log(credentials) 
        return credentials.user ? { id: "1", name: credentials.user } : null
      },
    }),
  ],
});
