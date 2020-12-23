const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const router = require('koa-router')();

const app = new Koa();

app.use(static(__dirname, +'/'));
app.use(bodyParser());

// 初始化数据库
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

// 建立关系
// 创建一个 一对一 关系, hasOne 和 belongsTo 关联一起使用;
// 创建一个 一对多 关系, hasMany 和 belongsTo 关联一起使用;
// 创建一个 多对多 关系, 两个 belongsToMany 调用一起使用

// Product 属于 User
Product.belongsTo(User, {
	// 约束
	constraints: true,
	// 防止删除了用户 a 商品关联消失
	onDelete: 'CASCADE',
});
// User 有多个 Product
User.hasMany(Product);
// User 有一个 Cart
User.hasOne(Cart);
// Cart 属于 User
Cart.belongsTo(User);
Cart.belongsToMany(Product, {
	through: CartItem,
});
Product.belongsToMany(Cart, {
	through: CartItem,
});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {
	through: OrderItem,
});
Product.belongsToMany(Order, {
	through: OrderItem,
});

// 同步数据
sequelize.sync().then(async (result) => {
	// 初始化数据
	// 查看第一个用户是否存在
	let user = await User.findByPk(1);

	if (!user) {
		user = await User.create({ name: 'admin', email: '888@qq.com' });
		await user.createCart();
	}

	app.listen(3000, () => {
		console.log('server is start at 3000');
	});
});

// 模拟鉴权
app.use(async (ctx, next) => {
	const user = await User.findByPk(1);
	ctx.user = user;
	await next();
});

// 查询商品
router.get('/admin/products', async (ctx) => {
	const products = await Product.findAll();
	ctx.body = { prods: products };
});

// 创建商品
router.post('/admin/product', async (ctx) => {
	const body = ctx.request.body;
	await ctx.user.createProduct(body);
	ctx.body = { success: true };
});

// 查询购物车
router.get('/cart', async (ctx) => {
	const cart = await ctx.user.getCart();
	const products = await cart.getProducts();
	ctx.body = { products };
});

// 添加购物车
router.post('/cart', async (ctx) => {
	const body = ctx.request.body;
	const prodId = body.id;
	let newQty = 1;
	const cart = await ctx.user.getCart();
	const products = await cart.getProducts({
		where: { id: prodId },
	});

	let product;
	if (products.length > 0) {
		product = products[0];
	}
	if (product) {
		const oldQty = product.cartItem.quantity;
		newQty = oldQty + 1;
	} else {
		product = await Product.findByPk(prodId);
	}
	await cart.addProduct(product, {
		through: {
			quantity: newQty,
		},
	});

	ctx.body = { success: true };
});

router.post('/orders', async (ctx) => {
	let fetchedCart;
	const cart = await ctx.user.getCart();
	fetchedCart = cart;
	const products = await cart.getProducts();
	const order = await ctx.user.createOrder();
	const result = await order.addProducts(
		products.map((p) => {
			p.orderItem = {
				quantity: p.cartItem.quantity,
			};
			return p;
		})
	);
	await fetchedCart.setProducts(null);
	ctx.body = { success: true };
});

router.delete('/cartItem/:id', async (ctx) => {
	const id = ctx.params.id;
	const cart = await ctx.user.getCart();
	const products = await cart.getProducts({
		where: { id },
	});
	const product = products[0];
	await product.cartItem.destroy();
	ctx.body = { success: true };
});

router.get('/orders', async (ctx) => {
	const orders = await ctx.user.getOrders({
		include: [
			// 简单外联
			'products',
			// 复杂外联举例
			// {
			//     model: Product,
			//     as: 'products',
			//     attributes: [
			//         'id',
			//         'title'
			//     ],
			//     where: {
			//         'title': 'A'
			//     }
			// }
		],

		order: [
			// ['id', 'DESC']
			['createdAt', 'DESC'],
		],
	});
	ctx.body = { orders };
});

app.use(router.routes());
