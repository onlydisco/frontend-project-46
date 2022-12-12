import { load } from 'js-yaml';

const parse = (data, type) => {
  switch (type) {
    case 'JSON':
      return JSON.parse(data);
    case 'YML':
      return load(data);
    default:
      throw new Error(`Unknown type: '${type}'!`);
  }
};

export default parse;
