import _ from 'lodash';

const defineValue = (data) => {
  switch (true) {
    case (_.isObject(data)):
      return '[complex value]';
    case (_.isString(data)):
      return `'${data}'`;
    default:
      return data;
  }
};

const plain = (tree) => {
  const iter = (node, propertyPath) => {
    const {
      status,
      value,
      value1,
      value2,
      children,
    } = node;

    switch (status) {
      case 'origin': {
        const result = children
          .map((child) => iter(child, child.key))
          .filter((elem) => elem !== null);
        return result.join('\n');
      }
      case 'removed': {
        return `Property '${propertyPath}' was removed`;
      }
      case 'added': {
        return `Property '${propertyPath}' was added with value: ${defineValue(value)}`;
      }
      case 'saved': {
        return null;
      }
      case 'updated': {
        return `Property '${propertyPath}' was updated. From ${defineValue(value1)} to ${defineValue(value2)}`;
      }
      case 'nested': {
        const interimResult = children
          .map((child) => iter(child, `${propertyPath}.${child.key}`))
          .filter((elem) => elem !== null);

        return interimResult.join('\n');
      }
      default:
        throw new Error(`Unknown status: '${status}'!`);
    }
  };

  return iter(tree);
};

export default plain;
