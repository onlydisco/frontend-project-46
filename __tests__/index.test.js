import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const appRoot = process.cwd();
const getFixturePath = (name) => path.join(appRoot, '__fixtures__', name);
const testFile = (name) => fs.readFileSync(getFixturePath(name), 'utf-8');

test('generate differences for two flat JSON files', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(testFile('expected.txt'));
});
