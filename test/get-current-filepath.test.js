import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getCurrentFilePath } from '../dist/es/index.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

describe('getCurrentFilePath Tests', () => {
  it('should return correct __filename and __dirname for CommonJS', () => {
    const { __filename: currentFilename, __dirname: currentDirname } =
      getCurrentFilePath(import.meta.url); // Pass import.meta.url here

    const expectedFilename = fileURLToPath(import.meta.url);
    const expectedDirname = path.dirname(expectedFilename);

    assert.equal(currentFilename, expectedFilename);
    assert.equal(currentDirname, expectedDirname);
  });

  it('should return correct __filename and __dirname for ES Modules', () => {
    const mockImportMetaUrl = import.meta.url;
    const { __filename, __dirname } = getCurrentFilePath(mockImportMetaUrl);

    const expectedFilename = fileURLToPath(mockImportMetaUrl);
    const expectedDirname = path.dirname(expectedFilename);

    assert.equal(__filename, expectedFilename);
    assert.equal(__dirname, expectedDirname);
  });

  it('should throw an error when import.meta.url is not provided in ES Module context', () => {
    assert.throws(() => getCurrentFilePath(), Error);
  });
});
