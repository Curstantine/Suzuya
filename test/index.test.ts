import path, { resolve } from "path";
import fs from "fs";
import { Config, Suzuya } from "../src/index";
import dotenv from "dotenv";
import { AuthCache } from "../src/utils/auth/types";

const env = dotenv.config({ path: path.resolve(".env") });

const config = new Config();
const suzu = new Suzuya(config);

const test = async () => {
  suzu.auth.Credentials = {
    email: env.parsed!.email,
    username: env.parsed!.username,
    password: env.parsed!.password,
  };

  let cache = "";
  try {
    cache = fs.readFileSync("tokens.dev.json").toString();
  } catch (error: any) {
    if (error.errno !== -2) {
      return;
    }
  }

  if (cache.length <= 0) {
    const tokens = await suzu.auth.login();
    fs.writeFileSync(resolve("tokens.dev.json"), JSON.stringify(tokens));
    console.info("Fresh Tokens!");
    console.log(suzu.auth.Cache);
  } else {
    suzu.auth.Cache = JSON.parse(cache) as AuthCache;
    console.info("Cached Tokens!");
    console.log(suzu.auth.Cache);
  }

  try {
    const data: { [key: string]: unknown } = {
      "List Manga": await suzu.manga.listManga({ title: "Isekai" }),
      "Reading Status": await suzu.manga.getAllReadingStatus(),
    };

    Object.keys(data).forEach((key) => {
      console.info("Testing:", key);
      console.log(data[key], "\n");
    });
  } catch (error: any) {
    console.error(error);
  }
};

test();
