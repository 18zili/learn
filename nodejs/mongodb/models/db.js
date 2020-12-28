const conf = require('./conf');

const { EventEmitter } = require('events');
const { MongoClient } = require('mongodb');

class Mongodb {
	constructor() {
		this.emitter = new EventEmitter();

		this.client = new MongoClient(conf.host, {
			useNewUrlParser: true,
		});
		this.client.connect((err) => {
			if (err) throw err;
			console.log('connect success');
			this.emitter.emit('connect');
		});
	}

	// 提供数据集合
	col(colName, dbName = conf.db) {
		return this.client.db(dbName).collection(colName);
	}

	// 订阅连接状态
	once(event, cb) {
		this.emitter.once(event, cb);
	}
}

module.exports = new Mongodb(conf);
