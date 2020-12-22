(async () => {
	const Sequelize = require('sequelize');

	const sequelize = new Sequelize('test', 'root', '123456', {
		host: 'localhost',
		// 方言
		dialect: 'mysql',
		operatorsAliases: false,
	});

	const Fruit = sequelize.define('Fruit', {
		name: {
			type: Sequelize.STRING(20),
			allowNull: false,
		},
		price: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
		stock: {
			type: Sequelize.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
	});

	// 同步
	await Fruit.sync();

	// 创建数据
	await Fruit.create({
		name: '香蕉',
		price: 3.3,
	});

	// 查询全部
	await Fruit.findAll();

	// 更新数据
	await Fruit.update({ price: 4 }, { where: { name: '香蕉' } });

	// 查询价格在4 - 2之间的数据
	const Op = Sequelize.Op;
	await Fruit.findAll({
		where: { price: { [Op.lt]: 4, [Op.gt]: 2 } },
	});
})();
