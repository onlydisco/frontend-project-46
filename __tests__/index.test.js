import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const testedJson1 = getFixturePath('file1.json');
const testedJson2 = getFixturePath('file2.json');
const testedYml1 = getFixturePath('file1.yaml');
const testedYml2 = getFixturePath('file2.yml');
const resultStylish = readFile('stylish.txt');
const resultPlain = readFile('plain.txt');
const resultJson = readFile('json.txt');

test('generate differences for two files in stylish-format', () => {
  expect(genDiff(testedJson1, testedJson2)).toEqual(resultStylish);
  expect(genDiff(testedYml1, testedYml2)).toEqual(resultStylish);
});

test('generate differences for two files in plain-format', () => {
  expect(genDiff(testedJson1, testedJson2, 'plain')).toEqual((resultPlain));
  expect(genDiff(testedYml1, testedYml2, 'plain')).toEqual((resultPlain));
});

test('generate differences for two files in json-format', () => {
  expect(genDiff(testedJson1, testedJson2, 'json')).toEqual((resultJson));
  expect(genDiff(testedYml1, testedYml2, 'json')).toEqual((resultJson));
});
