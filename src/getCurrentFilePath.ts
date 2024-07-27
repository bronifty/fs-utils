import { fileURLToPath } from 'url';
import path from 'path';

export function getCurrentFilePath(importMetaUrl: string) {
  if (typeof __filename !== 'undefined' && typeof __dirname !== 'undefined') {
    // CommonJS
    return {
      __filename,
      __dirname,
    };
  } else {
    // ESM
    const __filename = fileURLToPath(importMetaUrl);
    const __dirname = path.dirname(__filename);
    return {
      __filename,
      __dirname,
    };
  }
}
