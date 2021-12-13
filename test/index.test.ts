import { argv } from "process";
import { Suzuya } from "../src";

import testAuth from "./auth.test";
import testManga from "./manga.test";

const args = argv;
for (let i = 0; i < 2; i++) {
  args.shift();
}

const suzu = new Suzuya();

// testAuth(suzu);
switch (argv[0]) {
  case "manga":
    testManga(suzu);

  default:
    break;
}
