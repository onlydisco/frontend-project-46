import fs from 'fs';
import path from 'path';
import parse from './parse.js';
import getDifference from './getDifference.js';
import format from './formatters/index.js';

const readFile = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf-8');

const getType = (filepath) => {
  const extName = path.extname(filepath).toLowerCase();
  switch (extName) {
    case '.json':
      return 'JSON';
    case '.yml':
    case '.yaml':
      return 'YML';
    default:
      throw new Error(`Unknown file extension: '${extName}'!`);
  }
};

const getData = (filepath) => parse(readFile(filepath), getType(filepath));

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const diffTree = getDifference(data1, data2);

  return format(diffTree, formatName);
};

export default genDiff;
