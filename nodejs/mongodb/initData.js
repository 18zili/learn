const mongodb = require('./models/db');

mongodb.once('connect', async () => {
	const col = mongodb.col('fruits');

	// 删除所有
	await col.deleteMany();

	const data = new Array(100).fill().map((_, i) => {
		return {
			name: 'xxx' + i,
			price: i,
			category: Math.random() > 0.5 ? '水果' : '蔬菜',
		};
	});

	// 插入数据
	await col.insertMany(data);
});
