#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>', 'Path to file #1')
  .argument('<filepath2>', 'Path to file #2')
  .action((filepath1, filepath2) => console.log(genDiff(filepath1, filepath2)))
  .parse(process.argv);
