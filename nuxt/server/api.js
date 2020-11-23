const Koa = require('koa');
const router = require('koa-router')({ prefix: '/api' });
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.keys = ['some', 'other'];

const goods = [
	{ id: 1, name: '苹果1', price: 10 },
	{ id: 2, name: '苹果2', price: 20 },
];

router.get('/goods', (ctx) => {
	ctx.body = {
		ok: 1,
		goods,
	};
});

router.get('/detail', (ctx) => {
	ctx.body = {
		ok: 1,
		data: goods.find((good) => good.id == ctx.query.id),
	};
});

router.post('/login', (ctx) => {
	const { username, password } = ctx.request.body;
	if (username === 'lee' && password === '123') {
		const token = 'a mock token';
		ctx.cookies.set('token', token);
		ctx.body = {
			ok: 1,
			token,
		};
	} else {
		ctx.body = {
			ok: 0,
		};
	}
});

app.use(bodyParser());

app.use(router.routes());

app.listen(8080);
