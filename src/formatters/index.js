import stylish from './stylish.js';
import plain from './plain.js';
// import json from './json.js';

const formatter = (tree, format) => {
  switch (format) {
    // case 'json':
    //   return json(tree);
    case 'plain':
      return plain(tree);
    case 'stylish':
      return stylish(tree);
    default:
      return 'Unknown output format!';
  }
};

export default formatter;
