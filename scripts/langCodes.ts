"use strict";

import ISO6391 from "iso-639-1";
import { writeFileSync } from "fs";
import { resolve } from "path";

console.info("Adding ISO-6391 language codes types...");
const codes = ISO6391.getAllCodes();

const langObject = codes.map((code) => {
  const eng = ISO6391.getName(code);
  return `/**${eng}*/\n${code}?: string;`;
});

const langCodes = codes.map((code) => {
  const eng = ISO6391.getName(code);
  return `/**${eng}*/\n'${eng.split(" ").join("_")}' = '${code}',`;
});

const LangCodeObject = `export interface LangCodeObject {\n ${langObject.join("\n")} \n}`;
const LangCodes = `export enum LangCodes {\n ${langCodes.join("\n")} \n}`;

const path = resolve("src", "utils", "locale", "index.ts");
writeFileSync(path, `${LangCodeObject} \n\n ${LangCodes}`);
console.info("Language codes are added to:", path);
