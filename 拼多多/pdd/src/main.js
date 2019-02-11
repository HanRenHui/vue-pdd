// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router/index'
import router from './router/index'

import store from './../src/store/index'

import LyTab from 'ly-tab'

// 引入字体图标
import '@/common/style.css'

// 引入懒加载
import vueLazyLoad from 'vue-lazyload'

import loading from './common/images/lazy.png' 

import { Actionsheet } from 'mint-ui';

Vue.component(Actionsheet.name, Actionsheet);
Vue.use(vueLazyLoad,{
  loading
});


Vue.use(LyTab);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
