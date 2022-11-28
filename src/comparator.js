import _ from 'lodash';

const comparator = (node1, node2) => {
  const commonKeys = Object.keys({ ...node1, ...node2 }).sort();

  const difference = commonKeys.map((key) => {
    switch (true) {
      case !(key in node2):
        return { key, status: 'deleted', value: node1[key] };
      case !(key in node1):
        return { key, status: 'added', value: node2[key] };
      case ((_.isObject(node1[key]) && _.isObject(node2[key]))):
        return { key, status: 'nested', children: comparator(node1[key], node2[key]) };
      case !(_.isEqual(node1[key], node2[key])):
        return {
          key, status: 'updated', oldValue: node1[key], newValue: node2[key],
        };
      default:
        return { key, status: 'saved', value: node1[key] };
    }
  });

  return difference;
};

const getDifference = (node1, node2) => ({ status: 'origin', children: comparator(node1, node2) });

export default getDifference;
