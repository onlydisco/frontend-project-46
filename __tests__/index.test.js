import path from 'path';
import fs from 'fs';
import genDiff, { errorMessage } from '../src/index.js';

const appRoot = process.cwd();
const getFixturePath = (name) => path.join(appRoot, '__fixtures__', name);
const testFile = (name) => fs.readFileSync(getFixturePath(name), 'utf-8');

test('generate differences for two flat JSON files', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(testFile('exp-full.txt'));
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file3.json'))).toEqual(testFile('exp-delete.txt'));
  expect(genDiff(getFixturePath('file3.json'), getFixturePath('file1.json'))).toEqual(testFile('exp-add.txt'));
});

test('generate differences for two flat YAML files', () => {
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'))).toEqual(testFile('exp-full.txt'));
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file3.yml'))).toEqual(testFile('exp-delete.txt'));
  expect(genDiff(getFixturePath('file3.yml'), getFixturePath('file1.yaml'))).toEqual(testFile('exp-add.txt'));
});

test('invalid files', () => {
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('invalid.ext'))).toBe(errorMessage);
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('invalid.json'))).toBe(errorMessage);
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('invalid.yml'))).toBe(errorMessage);
});
