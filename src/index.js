import fs from 'fs';
import path from 'path';

const genDiff = (filepath1, filepath2) => {
  const first = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
  const second = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
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
