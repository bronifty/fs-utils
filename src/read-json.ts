export { readJson };

import fs from 'node:fs/promises';
import path from 'node:path';

async function readJson(relativePath: string) {
  const filePath = path.resolve(relativePath);
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}
