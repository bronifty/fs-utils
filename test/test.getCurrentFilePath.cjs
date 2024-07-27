const { getCurrentFilePath } = require('../dist/lib/index.js');

const { __filename: currentFilename, __dirname: currentDirname } =
  getCurrentFilePath();

console.log('Filename:', currentFilename);
console.log('Directory:', currentDirname);
