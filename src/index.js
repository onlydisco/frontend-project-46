import parser from './parsers.js';
import getDifference from './comparator.js';
import formatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const first = parser(filepath1);
  const second = parser(filepath2);
  const diffTree = getDifference(first, second);

  return formatter(diffTree, format);
};

export default genDiff;
