import parser from './parsers.js';
import getDifference from './comparator.js';
import formatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const first = parser(filepath1);
  const second = parser(filepath2);

  if (!first || !second) {
    return 'Invalid input';
  }

  const diff = getDifference(first, second);

  return formatter(diff, format);
};

export default genDiff;
