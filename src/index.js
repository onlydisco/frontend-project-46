import parse from './parsers.js';

export const errorMessage = 'Invalid input!';

const genDiff = (filepath1, filepath2) => {
  const first = parse(filepath1);
  const second = parse(filepath2);

  if (!first || !second) {
    return errorMessage;
  }

  const commonKeys = Object.keys({ ...first, ...second }).sort();
  const indent = '  ';
  const lineBreak = '\n';

  const diff = commonKeys.reduce((acc, current) => {
    switch (true) {
      case !(current in first):
        return acc.concat(indent, `+ ${current}: ${second[current]}`, lineBreak);
      case !(current in second):
        return acc.concat(indent, `- ${current}: ${first[current]}`, lineBreak);
      case first[current] !== second[current]:
        return acc.concat(indent, `- ${current}: ${first[current]}`, lineBreak, indent, `+ ${current}: ${second[current]}`, lineBreak);
      default:
        return acc.concat(indent, indent, `${current}: ${first[current]}`, lineBreak);
    }
  }, '');

  return `{\n${diff}}`;
};

export default genDiff;
