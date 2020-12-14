const fs = require('fs');
const handlerbars = require('handlebars');
const chalk = require('chalk');
const { log } = require('./log');

module.exports = async () => {
	const list = fs
		.readdirSync('./src/views')
		.filter((v) => v !== 'Home.vue')
		.map((v) => ({
			name: v.replace('.vue', '').toLocaleLowerCase(),
			file: v,
		}));

	// 生成路由
	compile({ list }, './src/router.js', './template/router.js.hbs');

	function compile(meta, filePath, templacePath) {
		if (fs.existsSync(templacePath)) {
			const content = fs.readFileSync(templacePath).toString();
			const result = handlerbars.compile(content)(meta);
			fs.writeFileSync(filePath, result);
			log(`🚀${filePath} 创建成功`);
		}
	}
};
