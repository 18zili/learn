import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import router from './router';
import store from './store';

import '@/icons';
import './permission';
import vPermission from './directives/permission';

Vue.directive('permission', vPermission);

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
