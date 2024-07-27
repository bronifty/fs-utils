import { readJsonFile } from '../src/index.ts';
import assert from 'assert';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testReadJsonFile() {
  // Create a temporary JSON file for testing
  const testData = { key: 'value' };
  const testFileName = 'test.json';
  const testDir = path.join(process.cwd(), 'events');
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
  }
  await fs.writeFile(testFilePath, JSON.stringify(testData));

  try {
    const result = await readJsonFile(testFilePath);
    assert.deepStrictEqual(
      result,
      testData,
      'The read JSON data should match the original data',
    );
    console.log('ESM Test passed: readJsonFile works correctly');

    const packageJson = await readJsonFile('../package.json');
    assert(packageJson.name, 'package.json should have a name');
    console.log('ESM Test passed: readJsonFile works correctly');
  } catch (error) {
    console.error('ESM Test failed:', error);
  } finally {
    // Clean up: remove the temporary file
    await fs.unlink(testFilePath);
  }
}

testReadJsonFile();
