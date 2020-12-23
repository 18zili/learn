const Sequelize = require('sequelize');
const env = require('dotenv');
const config = require('./config');

env.config();
// require('dotenv').config() // 默认读取项目根目录下的.env文件 如：process.env.DB_USER
const sequelize = new Sequelize(config.database, config.user, config.pwd, {
	dialect: 'mysql',
	host: config.host,
	operatorsAliases: false,
});

module.exports = sequelize;
