const test = require('node:test');
const assert = require('node:assert');
const { getProjectRoot } = require('../src/index');
const path = require('node:path');

test.describe('getProjectRoot', () => {
  test('should return the project root', () => {
    assert.equal(getProjectRoot(), process.cwd());
  });

  test('should use fallback method when when global error object throws', t => {
    const originalError = global.Error;
    const originalConsoleWarn = console.warn;

    // Mock Error to always throw
    global.Error = function () {
      throw new Error('Stack trace simulation failed');
    };

    // Mock console.warn
    console.warn = () => {};

    const result = getProjectRoot();

    // The fallback should return process.cwd()
    assert.equal(result, process.cwd());

    // Restore original functions
    global.Error = originalError;
    console.warn = originalConsoleWarn;
  });
});
