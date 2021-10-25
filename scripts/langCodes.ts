'use strict';

import ISO6391 from 'iso-639-1';
import { writeFileSync } from 'fs';

const as = ISO6391.getAllCodes().map((code) => {
  const eng = ISO6391.getName(code);
  return `/**${eng}*/\n${code}?: string;`;
});

const data = `export interface LangCodes {\n ${as.join('\n')} \n}`;
writeFileSync('./src/interfaces/langCodes.d.ts', data);
