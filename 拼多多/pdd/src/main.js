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


Vue.use(LyTab);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
