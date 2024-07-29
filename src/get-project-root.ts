export { getProjectRoot };
import fs from 'node:fs';
import path from 'node:path';

function getProjectRoot(startPath?: string): string {
  // If no startPath is provided, use the directory of the calling file
  if (!startPath) {
    try {
      const error = new Error();
      const stackLine = error.stack!.split('\n')[2];
      const callerFilePath =
        stackLine.match(/\((.*):\d+:\d+\)$/)?.[1] ??
        stackLine.match(/at (.*):\d+:\d+$/)?.[1] ??
        '';
      startPath = path.dirname(callerFilePath);
    } catch (error) {
      console.warn(
        'Failed to determine caller directory. Using current working directory.',
      );
      startPath = process.cwd();
    }
  }

  return findProjectRoot(startPath);
}

// Helper function to find project root by looking for package.json
function findProjectRoot(startDir: string): string {
  let currentDir = path.resolve(startDir);
  while (currentDir !== path.parse(currentDir).root) {
    if (fs.existsSync(path.join(currentDir, 'package.json'))) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }
  console.warn('Could not find project root. Returning starting directory.');
  return startDir;
}

const projectRoot1 = getProjectRoot();

const projectRoot2 = getProjectRoot('./events/apig.json');

console.log('projectRoot1', projectRoot1);
console.log('projectRoot2', projectRoot2);

// export { getProjectRoot };
// import fs from 'node:fs';
// import path from 'node:path';

// function getProjectRoot() {
//   try {
//     const error = new Error();
//     const stackLine = error.stack!.split('\n')[2];
//     const callerFilePath =
//       stackLine.match(/\((.*):\d+:\d+\)$/)?.[1] ??
//       stackLine.match(/at (.*):\d+:\d+$/)?.[1] ??
//       '';
//     const callerDir = path.dirname(callerFilePath);
//     return path.resolve(callerDir, '..');
//   } catch (error) {
//     // Fallback: Use process.cwd() if error stack logic fails
//     console.warn(
//       'Failed to determine project root from error stack. Using fallback method.',
//     );
//     return findProjectRoot(process.cwd());
//   }
// }

// // Helper function to find project root by looking for package.json
// function findProjectRoot(startDir: string): string {
//   let currentDir = startDir;
//   while (currentDir !== path.parse(currentDir).root) {
//     if (fs.existsSync(path.join(currentDir, 'package.json'))) {
//       return currentDir;
//     }
//     currentDir = path.dirname(currentDir);
//   }
//   console.warn(
//     'Could not find project root. Returning current working directory.',
//   );
//   return startDir;
// }

// // export { getProjectRoot };
// // import fs from 'node:fs/promises';
// // import path from 'node:path';

// // function getProjectRoot() {
// //   const error = new Error();
// //   const stackLine = error.stack!.split('\n')[2];
// //   const callerFilePath =
// //     stackLine.match(/\((.*):\d+:\d+\)$/)?.[1] ??
// //     stackLine.match(/at (.*):\d+:\d+$/)?.[1] ??
// //     '';
// //   const callerDir = path.dirname(callerFilePath);
// //   return path.resolve(callerDir, '..');
// // }

// // export { root };
// // // https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag/50052194#50052194

// // import { dirname } from "path";
// // import { fileURLToPath } from "url";
// // const __dirname = dirname(fileURLToPath(import.meta.url));
// // const root = `${__dirname}/..`;
