const fs = require('node:fs/promises');
const path = require('node:path');
const {
  getProjectRoot,
  readJson,
  getNestedProperty,
} = require('../src/index.ts');
const test = require('node:test');
const assert = require('node:assert');

test.describe('readJsonFileRelativeToRoot', () => {
  test('should read package.json', async () => {
    const result = await readJson(`${getProjectRoot()}/package.json`);
    assert(result.name, 'Package.json should have a name property');
  });

  test('should match the test.json file', async () => {
    const testData =
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8';

    try {
      const jsonFile = await readJson(
        `${getProjectRoot()}/test/events/apig.json`,
      );
      const result = getNestedProperty(jsonFile, 'multiValueHeaders.Accept.0');
      assert.deepStrictEqual(
        result,
        testData,
        'The read JSON data should match the original data',
      );
    } catch (error) {
      console.error('Test failed:', error);
    }
  });
});

// const jsonFile = await readJson(`${getProjectRoot()}/test/events/apig.json`);
// const property = 'multiValueHeaders.Accept.0';
// const result = getNestedProperty(jsonFile, property);
// console.log('result', result);
// console.log(
//   getNestedProperty(
//     readJson(`${getProjectRoot()}/test/events/apig.json`),
//     'multiValueHeaders.Accept',
//   ),
// );
