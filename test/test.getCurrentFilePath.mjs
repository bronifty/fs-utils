import { getCurrentFilePath } from '../dist/es/index';

const { __filename, __dirname } = getCurrentFilePath(import.meta.url);

console.log('Filename:', __filename);
console.log('Directory:', __dirname);
