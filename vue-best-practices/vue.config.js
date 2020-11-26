const path = require('path');

module.exports = {
	publicPath: '/best-practices',
	devServer: {
		port: 7070,
	},
	// 配置webpack
	// configureWebpack: {
	// 	resolve: {
	// 		alias: {
	// 			comps: path.join(__dirname, 'src/components'),
	// 		},
	// 	},
	// },
	configureWebpack(config) {
		// 修改config或者返回一个对象将来个config合并
		config.resolve.alias.comps = path.join(__dirname, 'src/components');
		// 判断环境变量
		if (process.env.NODE_ENV === 'development') {
			config.name = 'vue项目最佳实践';
		} else {
			config.name = 'vue best practices';
		}
	},
	// 高级
	chainWebpack(config) {
		// 配置 svg 规则
		// 1. 默认的svg规则移除icons目录
		config.module
			.rule('svg')
			.exclude.add(path.resolve(__dirname, 'src/icons'));

		// 2.新增icon规则 只包含icons目录
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(path.resolve(__dirname, 'src/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({ symbolId: 'icon-[name]' });
	},
};
