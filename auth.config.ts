import { defineConfig } from "auth-astro";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Credentials from "@auth/core/providers/credentials";
import { client } from "./src/lib/db";

export default defineConfig({
  adapter: MongoDBAdapter(client),

  providers: [
    Credentials({
      credentials: {
        user: { label: "user" },
        password: { label: "password", type: "password" },
      },
      async authorize({ request }) {
        console.log(request)
      },
    }),
  ],
  secret: "1"
});
