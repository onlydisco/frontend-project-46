import _ from 'lodash';

const indent = (depth, space = ' ', count = 4) => space.repeat(depth * count - 2);

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
      value1,
      value2,
      children,
    } = node;

    switch (status) {
      case 'origin': {
        const result = children.flatMap((child) => iter(child, depth + 1));
        return `{\n${result.join('\n')}\n}`;
      }
      case 'removed': {
        return `${indent(depth)}- ${key}: ${stringify(value, depth)}`;
      }
      case 'added': {
        return `${indent(depth)}+ ${key}: ${stringify(value, depth)}`;
      }
      case 'saved': {
        return `${indent(depth)}  ${key}: ${stringify(value, depth)}`;
      }
      case 'updated': {
        const field1 = `${indent(depth)}- ${key}: ${stringify(value1, depth)}`;
        const field2 = `${indent(depth)}+ ${key}: ${stringify(value2, depth)}`;
        return `${field1}\n${field2}`;
      }
      case 'nested': {
        const interimResult = children.flatMap((child) => iter(child, depth + 1));
        return `${indent(depth)}  ${key}: {\n${interimResult.join('\n')}\n${indent(depth)}  }`;
      }
      default:
        throw new Error(`Unknown status: '${status}'!`);
    }
  };

  return iter(tree);
};

export default stylish;
