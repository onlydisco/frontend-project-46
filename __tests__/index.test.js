import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const appRoot = process.cwd();
const getFixturePath = (name) => path.join(appRoot, '__fixtures__', name);
const testFile = (name) => fs.readFileSync(getFixturePath(name), 'utf-8');

test('generate differences for two JSON files in stylish-format', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(testFile('stylish-full.txt'));
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file3.json'))).toEqual(testFile('stylish-delete.txt'));
  expect(genDiff(getFixturePath('file3.json'), getFixturePath('file1.json'))).toEqual(testFile('stylish-add.txt'));
});

test('generate differences for two YAML files in stylish-format', () => {
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'))).toEqual(testFile('stylish-full.txt'));
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file3.yml'))).toEqual(testFile('stylish-delete.txt'));
  expect(genDiff(getFixturePath('file3.yml'), getFixturePath('file1.yaml'))).toEqual(testFile('stylish-add.txt'));
});

// test('invalid files', () => {
//   expect(genDiff(getFixturePath('file1.json'), getFixturePath('invalid.ext'))).toBe('Invalid input');
//   expect(genDiff(getFixturePath('file1.json'), getFixturePath('invalid.json'))).toBe('Invalid input');
//   expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('invalid.yml'))).toBe('Invalid input');
// });
