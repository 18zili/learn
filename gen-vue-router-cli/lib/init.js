const { promisify } = require('util');
const figlet = promisify(require('figlet'));
const clear = require('clear');
const open = require('open');

const { clone } = require('./download');
const { log } = require('./log');

const spawn = async (...args) => {
	const { spawn } = require('child_process');
	return new Promise((resolve) => {
		const proc = spawn(...args);
		proc.stdout.pipe(process.stdout);
		proc.stderr.pipe(process.stderr);
		proc.on('close', () => {
			resolve();
		});
	});
};

module.exports = async (name) => {
	clear();
	const data = await figlet('Welcome');
	log(data);

	log('🚀创建项目:' + name);
	// await clone('github:su37josephxia/vue-template', name);

	log('🕙安装依赖...');
	// await spawn('npm', ['install'], { cwd: `./${name}` });
	log('👌安装完成!');

	await spawn('npm', ['run', 'serve'], { cwd: `./${name}` });
	open('http://localhost:8080');
};
