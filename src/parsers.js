import { load } from 'js-yaml';
import fs from 'fs';
import path from 'path';

const parse = (filepath) => {
  const fileData = fs.readFileSync(path.resolve(filepath), 'utf-8');
  const fileExtName = path.extname(filepath).toLowerCase();

  try {
    switch (fileExtName) {
      case '.json':
        return JSON.parse(fileData);
      case '.yaml':
      case '.yml':
        return load(fileData) || {};
      default:
        return null;
    }
  } catch (e) {
    return null;
  }
};

export default parse;
