import path from 'path';
import { fileURLToPath } from 'url';

function getCurrentFilePath(importMetaUrl?: string) {
  if (typeof __filename !== 'undefined' && typeof __dirname !== 'undefined') {
    // CommonJS
    return {
      getCurrentFilename: (pathStr = './') => path.resolve(__filename, pathStr),
      getCurrentDirname: (pathStr = './') => path.resolve(__dirname, pathStr),
    };
  } else if (importMetaUrl) {
    // ES Module
    const __filename = fileURLToPath(importMetaUrl);
    const __dirname = path.dirname(__filename);
    return {
      getCurrentFilename: (pathStr = './') => path.resolve(__filename, pathStr),
      getCurrentDirname: (pathStr = './') => path.resolve(__dirname, pathStr),
    };
  } else {
    throw new Error('Unable to determine current file path');
  }
}

export { getCurrentFilePath };
