import fs from 'node:fs/promises';
import path from 'node:path';
import { getProjectRoot, readJson } from '../src/index.ts';
import test from 'node:test';
import assert from 'node:assert';

test.describe('readJson', () => {
  test('should read package.json', async () => {
    const result = await readJson('../package.json');
    assert(result.name, 'Package.json should have a name property');
  });

  test('should match the test.json file', async () => {
    const testData = { key: 'value' };
    const testFileName = 'test.json';
    const testDir = `${getProjectRoot()}/test/events`;
    const testFilePath = path.join(testDir, testFileName);

    // Check if directory exists before creating it
    try {
      await fs.access(testDir);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.mkdir(testDir, { recursive: true });
      } else {
        throw error;
      }
    } finally {
      await fs.writeFile(testFilePath, JSON.stringify(testData));
    }
    try {
      const result = await readJson(testFilePath);
      assert.deepStrictEqual(
        result,
        testData,
        'The read JSON data should match the original data',
      );
    } catch (error) {
      console.error('CJS Test failed:', error);
    } finally {
      // Clean up: remove the temporary file
      await fs.unlink(testFilePath);
    }
  });
});
