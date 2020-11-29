import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

// 通用页面：不需要守卫，可直接访问
export const constRoutes = [
	{
		path: '/login',
		component: () => import('@/views/Login'),
		hidden: true,
	},
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
];

// 权限页面：受保护页面，要求用户登录
export const asyncRoutes = [
	{
		path: '/about',
		component: () => import('@/views/About'),
		name: 'about',
		meta: {
			title: 'About',
			icon: 'wx',
			roles: ['admin', 'editor'],
		},
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: constRoutes,
});

export default router;
