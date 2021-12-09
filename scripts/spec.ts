import fetch from "node-fetch";
import fs from "fs";
import { resolve } from "path";

(async () => {
  console.info("Downloading the latest API spec.");
  const res = await fetch("https://api.mangadex.org/api.yaml", { method: "GET" });
  if (res.status > 400) {
    return console.error(`${res.statusText} [${res.status}]`);
  }
  const data = await res.text();
  fs.writeFileSync(resolve("api.yaml"), data);
  console.info("Downloaded the latest API spec to", resolve("api.yaml"));
})();
