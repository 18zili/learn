#!/usr/bin/env node
// 规定脚本解释器为 node

const program = require('commander');

program.version(require('../package.json').version);

program
	.command('init <name>')
	.description('init project')
	.action(require('../lib/init'));

program
	.command('refresh')
	.description('refresh router')
	.action(require('../lib/refresh'));

program.parse(process.argv);
