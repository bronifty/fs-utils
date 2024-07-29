import test from 'node:test';
import assert from 'node:assert';
import { getProjectRoot, readJson, getNestedProperty } from '../src/index';

test.describe('getNestedProperty', () => {
  test('should read json file into memory from project root and get a nested property', async () => {
    const apigData = await readJson(
      `${getProjectRoot()}/test/events/apig.json`,
    );
    const val = getNestedProperty(apigData, 'multiValueHeaders.Accept.0');
    assert.equal(
      val,
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    );
  });
});

// // Test
// const data = { items: [{ name: "bronifty" }] };
// const val = get(data, "items.0");
// console.log(val); // Should output "bronifty"
