const test = require('node:test');
const assert = require('node:assert');
const { getProjectRoot } = require('../src/index');

console.log('getProjectRoot()', getProjectRoot());
console.log('process.cwd()', process.cwd());

test.describe('getProjectRoot', () => {
  test('should return the project root', () => {
    assert.equal(getProjectRoot(), process.cwd());
  });
});
