import fs from 'fs';
import path from 'path';
import parse from './parse.js';
import getDifference from './getDifference.js';
import format from './formatters/index.js';

const readFile = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf-8');

const getType = (filepath) => path.extname(filepath).slice(1).toLowerCase();

const getData = (filepath) => parse(readFile(filepath), getType(filepath));

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const diffTree = getDifference(data1, data2);

  return format(diffTree, formatName);
};

export default genDiff;
