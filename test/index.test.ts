import path from "path";
import { Config, Suzuya } from "../src/index";
import dotenv from "dotenv";

const env = dotenv.config({ path: path.resolve("./dev.env") });

const config = new Config();
const suzu = new Suzuya(config);

const test = async () => {
  suzu.auth.Credentials = {
    email: env.parsed!.email,
    username: env.parsed!.username,
    password: env.parsed!.password,
  };

  await suzu.auth.login();
  console.log(await suzu.manga.getAllReadingStatus());
};

test();
