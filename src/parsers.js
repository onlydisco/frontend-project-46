import { load } from 'js-yaml';
import fs from 'fs';
import path from 'path';

const parser = (filepath) => {
  const fileData = fs.readFileSync(path.resolve(filepath), 'utf-8');
  const fileExtName = path.extname(filepath).toLowerCase();

  switch (fileExtName) {
    case '.json':
      return JSON.parse(fileData);
    case '.yaml':
    case '.yml':
      return load(fileData) || {};
    default:
      return 'Unknown input format!';
  }
};

export default parser;
