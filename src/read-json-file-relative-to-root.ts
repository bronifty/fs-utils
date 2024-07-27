export { readJsonFileRelativeToRoot };

import fs from 'node:fs/promises';
import path from 'node:path';

async function readJsonFileRelativeToRoot(relativePath: string) {
  const callerDir = path.dirname(
    new Error().stack!.split('\n')[2].match(/\((.*):\d+:\d+\)$/)?.[1] ?? '',
  );
  const filePath = path.resolve(callerDir, relativePath);
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}
// export { readJsonFile };

// import fs from 'node:fs/promises';
// import path from 'node:path';

// async function readJsonFile(filename: string) {
//   const filePath = path.join(process.cwd(), filename);
//   const data = await fs.readFile(filePath, 'utf8');
//   return JSON.parse(data);
// }
