import fs from 'node:fs/promises';
import path from 'node:path';
import { getProjectRoot, readJson, getNestedProperty } from '../src/index.ts';

async function readJsonGetProperty(path: string) {
  const jsonFile = await readJson(path);
  const result = getNestedProperty(jsonFile, 'multiValueHeaders.Accept.0');
  return result;
}

readJsonGetProperty(`${getProjectRoot()}/test/events/apig.json`)
  .then(result => {
    console.log('result', result);
  })
  .catch(error => {
    console.error('Error reading JSON file:', error);
  });

async function readJsonFile(path: string) {
  return await readJson(path);
}
readJsonFile(`${getProjectRoot()}/package.json`)
  .then(json => {
    console.log(json);
  })
  .catch(error => {
    console.error('Error reading JSON file:', error);
  });
