import { load } from 'js-yaml';

const parse = (data, type) => {
  switch (type) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return load(data);
    default:
      throw new Error(`Unknown type: '${type}'!`);
  }
};

export default parse;
