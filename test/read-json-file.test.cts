import { readJsonFile } from '../src/readJsonFile.ts';
import assert from 'assert';
import fs from 'fs/promises';
import path from 'path';

async function testReadJsonFile() {
  // Create a temporary JSON file for testing
  const testData = { key: 'value' };
  const testFileName = 'test.json';
  const testFilePath = path.join(process.cwd(), 'events', testFileName);

  await fs.mkdir(path.dirname(testFilePath), { recursive: true });
  await fs.writeFile(testFilePath, JSON.stringify(testData));

  try {
    const result = await readJsonFile(testFileName);
    assert.deepStrictEqual(
      result,
      testData,
      'The read JSON data should match the original data',
    );
    console.log('CJS Test passed: readJsonFile works correctly');
  } catch (error) {
    console.error('CJS Test failed:', error);
  } finally {
    // Clean up: remove the temporary file
    await fs.unlink(testFilePath);
  }
}

testReadJsonFile();
