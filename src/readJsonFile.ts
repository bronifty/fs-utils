export { readJsonFile };

import fs from "node:fs/promises";
import path from "node:path";

async function readJsonFile(filename: string) {
  const filePath = path.join(process.cwd(), "events", filename);
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data);
}
