import test from 'node:test';
import assert from 'node:assert';
import path from 'node:path';
import { getProjectRoot } from '../src/index';

console.log('getProjectRoot()', getProjectRoot());
console.log('process.cwd()', process.cwd());

test.describe('getProjectRoot', () => {
  test('should return the project root', () => {
    assert.equal(getProjectRoot(), process.cwd());
  });

  test('should return the project root when passed a relative path', () => {
    assert.equal(getProjectRoot('./events/apig.json'), process.cwd());
  });

  test('should use fallback method when global error object throws', t => {
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
