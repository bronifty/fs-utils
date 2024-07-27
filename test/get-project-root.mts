import test from 'node:test';
import assert from 'node:assert';
import { getProjectRoot } from '../src/index';

console.log('getProjectRoot()', getProjectRoot());
console.log('process.cwd()', process.cwd());

test.describe('getProjectRoot', () => {
  test('should return the project root', () => {
    assert.equal(getProjectRoot(), process.cwd());
  });
});
