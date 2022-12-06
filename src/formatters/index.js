import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatter = (diffTree, format) => {
  switch (format) {
    case 'json':
      return json(diffTree);
    case 'plain':
      return plain(diffTree);
    case 'stylish':
      return stylish(diffTree);
    default:
      return 'Unknown output format!';
  }
};

export default formatter;
