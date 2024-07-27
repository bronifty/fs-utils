export { getProjectRoot };
import fs from 'node:fs/promises';
import path from 'node:path';

function getProjectRoot() {
  const error = new Error();
  const stackLine = error.stack!.split('\n')[2];
  const callerFilePath =
    stackLine.match(/\((.*):\d+:\d+\)$/)?.[1] ??
    stackLine.match(/at (.*):\d+:\d+$/)?.[1] ??
    '';
  const callerDir = path.dirname(callerFilePath);
  return path.resolve(callerDir, '..');
}

// export { root };
// // https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag/50052194#50052194

// import { dirname } from "path";
// import { fileURLToPath } from "url";
// const __dirname = dirname(fileURLToPath(import.meta.url));
// const root = `${__dirname}/..`;
