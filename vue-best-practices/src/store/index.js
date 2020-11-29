import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';
import permission from './permission';

Vue.use(Vuex);

export default new Vuex.Store({
	getters: {
		roles: (state) => state.user.roles,
		hasRoles: (state) => state.user.roles && state.user.roles.length > 0,
		permission_routes: (state) => state.permission.routes,
	},
	modules: {
		user,
		permission,
	},
});
