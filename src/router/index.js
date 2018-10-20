import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import Demo1 from '@/components/Demo1';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Router);
Vue.use(ElementUI);

export default new Router({
	routes:[
		{
			path:'/',
			name:'Home',
			component:Home
		},
		{
			path:'/demo1',
			name:'demo1',
			component:Demo1
		}
	]
});
