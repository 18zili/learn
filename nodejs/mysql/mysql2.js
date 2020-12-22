(async () => {
	const mysql = require('mysql2');

	const config = {
		host: 'localhost',
		user: 'root',
		password: '123456',
	};

	const connection = await mysql.createConnection(config);
})();
