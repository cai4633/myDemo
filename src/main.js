import Vue from'vue';
import App from'./App';
import router from'./router';
import VueResource from'vue-resource';
import'../src/assets/iconfont/iconfont.css';
// import mockjs from 'mockjs';
Vue.use(VueResource);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	render: h => h(App)
});
