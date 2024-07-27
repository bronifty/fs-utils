const { readJsonFile } = require('../src/index.ts');
const assert = require('assert');
const fs = require('fs/promises');
const path = require('path');

async function testReadJsonFile() {
  // Create a temporary JSON file for testing
  const testData = { key: 'value' };
  const testFileName = 'test.json';
  const testDir = path.join(__dirname, 'events');
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
    // Test reading a file relative to the test directory
    const result = await readJsonFile(testFilePath);
    assert.deepStrictEqual(
      result,
      testData,
      'The read JSON data should match the original data',
    );
    console.log(
      'CJS Test passed: readJsonFile works correctly with relative path',
    );

    // Test reading package.json from the root directory
    const packageJson = await readJsonFile('../package.json');
    assert(packageJson.name, 'Package.json should have a name property');
    console.log(
      'CJS Test passed: readJsonFile can read package.json from root',
    );
  } catch (error) {
    console.error('CJS Test failed:', error);
  } finally {
    // Clean up: remove the temporary file
    await fs.unlink(testFilePath);
  }
}

testReadJsonFile();

// const { readJsonFile } = require('../src/index.ts');
// const assert = require('assert');
// const fs = require('fs/promises');
// const path = require('path');

// async function testReadJsonFile() {
//   // Create a temporary JSON file for testing
//   const testData = { key: 'value' };
//   const testFileName = 'test.json';
//   const testFilePath = path.join(process.cwd(), 'events', testFileName);

//   await fs.mkdir(path.dirname(testFilePath), { recursive: true });
//   await fs.writeFile(testFilePath, JSON.stringify(testData));

//   try {
//     const result = await readJsonFile(`./${testFileName}`);
//     assert.deepStrictEqual(
//       result,
//       testData,
//       'The read JSON data should match the original data',
//     );
//     console.log('CJS Test passed: readJsonFile works correctly');
//   } catch (error) {
//     console.error('CJS Test failed:', error);
//   } finally {
//     // Clean up: remove the temporary file
//     await fs.unlink(testFilePath);
//   }
// }

// testReadJsonFile();
