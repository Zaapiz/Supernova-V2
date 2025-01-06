import { BareMuxConnection } from "@mercuryworkshop/bare-mux";
import "/scramjet/scramjet.controller.js";

let scramjet: ScramjetController;
let conn: BareMuxConnection;
try {
  conn = new BareMuxConnection("/baremux/worker.js");

  scramjet = new ScramjetController({
    prefix: "/service/scramjet/",
    files: {
      wasm: "/scramjet/scramjet.wasm.js",
      worker: "/scramjet/scramjet.worker.js",
      client: "/scramjet/scramjet.client.js",
      shared: "/scramjet/scramjet.shared.js",
      sync: "/scramjet/scramjet.sync.js",
    },
  });
} catch (err) {
  console.error(err);
}

const wispUrl =
  (location.protocol === "https:" ? "wss" : "ws") +
  "://" +
  location.host +
  "/wisp/";

const bareUrl = location.protocol + "//" + location.host + "/bare/";

export async function initTransport(transportsel: string) {
  try {
    if (transportsel == "epoxy") {
      await conn.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
    } else if (transportsel == "libcurl") {
      await conn.setTransport("/libcurl/index.mjs", [{ wisp: wispUrl }]);
    } else {
      await conn.setTransport("/bareasmodule/index.mjs", [bareUrl]);
    }
  } catch (err) {
    console.error(err);
  }
}

export { scramjet };
