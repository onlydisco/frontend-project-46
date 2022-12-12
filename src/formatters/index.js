import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const format = (diffTree, formatName) => {
  switch (formatName) {
    case 'json':
      return json(diffTree);
    case 'plain':
      return plain(diffTree);
    case 'stylish':
      return stylish(diffTree);
    default:
      throw new Error(`Unknown output format: '${formatName}'!`);
  }
};

export default format;
