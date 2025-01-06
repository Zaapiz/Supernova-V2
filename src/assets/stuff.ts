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
let proxy = localStorage.getItem("proxy");
let transport = localStorage.getItem("transport");

if (!proxy) {
  localStorage.setItem("proxy", "uv");
  proxy = "uv";
}

if (!transport) {
  localStorage.setItem("transport", "epoxy");
  transport = "epoxy";
}

export async function setProxy(proxysel: string) {
  localStorage.setItem("proxy", proxysel);
  proxy = proxysel;
}

export async function setTransport(transportsel: string) {
  try {
    localStorage.setItem("transport", transportsel);
    transport = transportsel;
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
setTransport(transport);

export function search(input: string) {
  const template = "https://www.google.com/search?q=%s";
  try {
    // input is a valid URL:
    return new URL(input).toString();
  } catch {
    // Ignore invalid URL
  }

  try {
    const url = new URL(`http://${input}`);
    if (url.hostname.includes(".")) return url.toString();
  } catch {
    // Ignore invalid URL
  }

  return template.replace("%s", encodeURIComponent(input));
}

export { proxy, scramjet };

export function setFavicon(iconPath: string) {
  let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = iconPath;
}
