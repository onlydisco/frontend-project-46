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
      oldValue,
      newValue,
      children,
    } = node;

    switch (status) {
      case 'origin': {
        const result = children.map((child) => iter(child, child.key));
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
        return `Property '${propertyPath}' was updated. From ${defineValue(oldValue)} to ${defineValue(newValue)}`;
      }
      case 'nested': {
        const interimResult = children
          .map((child) => iter(child, `${propertyPath}.${child.key}`))
          .filter((elem) => elem !== null);
        return interimResult.join('\n');
      }
      default:
        return 'Unknown status!';
    }
  };

  return iter(tree);
};

export default plain;
