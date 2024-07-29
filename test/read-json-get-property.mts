import fs from 'node:fs/promises';
import path from 'node:path';
import { getProjectRoot, readJson, getNestedProperty } from '../src/index.ts';
import test from 'node:test';
import assert from 'node:assert';

test.describe('readJsonFileRelativeToRoot', () => {
  test('should match the test.json file', async () => {
    const testData =
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8';

    try {
      const jsonFile = await readJson(
        `${getProjectRoot()}/test/events/apig.json`,
      );
      const result = getNestedProperty(jsonFile, 'multiValueHeaders.Accept');
      assert.deepStrictEqual(
        result,
        testData,
        'The read JSON data should match the original data',
      );
    } catch (error) {
      console.error('CJS Test failed:', error);
    }
  });

  test('should read package.json', async () => {
    const result = await readJson(`${getProjectRoot()}/package.json`);
    assert(result.name, 'Package.json should have a name property');
  });
});
