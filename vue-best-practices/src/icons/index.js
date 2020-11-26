import Vue from 'vue';
import Icon from '@/components/Icon';

// 获取一个以svg目录为上下文的require方法
const req = require.context('./svg', false, /\.svg$/);
// 获取当前目录中所有文件名，并且用req函数加载他们
req.keys().map(req);

// 注册全局组件
Vue.component('Icon', Icon);
