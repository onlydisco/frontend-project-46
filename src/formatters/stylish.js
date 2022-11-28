import _ from 'lodash';

const indent = (depth, space = '  ', count = 2) => space.repeat(depth * count - 1);

const stringify = (data, depth = 1) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const keys = Object.keys(data);
  const result = keys.map((key) => `${indent(depth + 1)}  ${key}: ${stringify(data[key], depth + 1)}`);

  return `{\n${result.join('\n')}\n  ${indent(depth)}}`;
};

const stylish = (tree) => {
  const iter = (node, depth = 0) => {
    const {
      key,
      status,
      value,
      oldValue,
      newValue,
      children,
    } = node;

    switch (status) {
      case 'origin': {
        const innerValue = children.flatMap((child) => iter(child, depth + 1));
        return `{\n${innerValue.join('\n')}\n}`;
      }
      case 'deleted': {
        return `${indent(depth)}- ${key}: ${stringify(value, depth)}`;
      }
      case 'added': {
        return `${indent(depth)}+ ${key}: ${stringify(value, depth)}`;
      }
      case 'saved': {
        return `${indent(depth)}  ${key}: ${stringify(value, depth)}`;
      }
      case 'updated': {
        const field1 = `${indent(depth)}- ${key}: ${stringify(oldValue, depth)}`;
        const field2 = `${indent(depth)}+ ${key}: ${stringify(newValue, depth)}`;
        return `${field1}\n${field2}`;
      }
      case 'nested': {
        const innerValue = children.flatMap((child) => iter(child, depth + 1));
        return `${indent(depth)}  ${key}: {\n${innerValue.join('\n')}\n${indent(depth)}  }`;
      }
      default:
        return 'Unknown status!';
    }
  };

  return iter(tree);
};

export default stylish;
