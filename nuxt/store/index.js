// nuxtServerInit 只能在 store/index 进行， 只在服务端执行
export const actions = {
	nuxtServerInit({ commit }, { app }) {
		// app: server ctor
		const token = app.$cookies.get('token');
		if (token) {
			console.log('nuxtServerInit: ' + token);
			commit('user/init', token);
		}
	},
};
