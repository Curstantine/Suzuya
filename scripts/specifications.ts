import fetch from 'node-fetch';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'path';

console.info('Downloading the latest API spec.');
const res = await fetch('https://api.mangadex.org/api.yaml', { method: 'GET' });
if (res.status > 400) {
  throw new Error(`${res.statusText} [${res.status}]`);
}

await writeFile(resolve('api.yaml'), await res.text());
console.info('Downloaded the latest API spec to', resolve('api.yaml'));
