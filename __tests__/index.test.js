import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const appRoot = process.cwd();
const getFixturePath = (name) => path.join(appRoot, '__fixtures__', name);
const testFile = (name) => fs.readFileSync(getFixturePath(name), 'utf-8');
const testedJson1 = getFixturePath('file1.json');
const testedJson2 = getFixturePath('file2.json');
const testedYml1 = getFixturePath('file1.yaml');
const testedYml2 = getFixturePath('file2.yml');
const resultStylish = testFile('stylish.txt');
const resultPlain = testFile('plain.txt');
const resultJson = testFile('json.txt');

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
