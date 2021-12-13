import path, { resolve } from "path";
import fs from "fs";
import { Suzuya } from "../src/index";
import dotenv from "dotenv";
import { AuthCache } from "../src/utils/auth/types";

const env = dotenv.config({ path: path.resolve(".env") });

async function testAuth(suzu: Suzuya) {
  try {
    const writeCache = (authCache: AuthCache) =>
      fs.writeFileSync(
        resolve("tokens.dev.json"),
        JSON.stringify(authCache, undefined, "\n"),
      );

    suzu.auth.Credentials = {
      email: env.parsed!.email,
      username: env.parsed!.username,
      password: env.parsed!.password,
    };

    let cache = "";
    cache = fs.readFileSync("tokens.dev.json").toString();

    if (cache.length <= 0) {
      const tokens = await suzu.auth.login();
      writeCache(tokens);
      console.info(
        "Logged in as:",
        suzu.auth.Credentials.username || suzu.auth.Credentials.email,
      );
    } else {
      suzu.auth.Cache = JSON.parse(cache) as AuthCache;
      console.info("Logging in from cache.");

      if (!(await suzu.auth.checkToken()).isAuthenticated) {
        console.info("Token is expired, sending a refresh request.");
        const refTokens = await suzu.auth.refreshToken();
        writeCache(refTokens);
      }
    }

    console.info("Authenticated without any errors!");
  } catch (error) {
    return console.error(error);
  }
}
export default testAuth;
