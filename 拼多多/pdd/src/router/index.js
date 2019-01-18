import Vue from 'vue'
import VueRouter from 'vue-router'


// 一级路由
import Home from './../vues/Home/Home'
import Recommend from './../vues/Recommend/Recommend'
import Search from './../vues/Search/Search'
import Cart from './../vues/Cart/Cart'
import Me from './../vues/Me/Me'
import Login from './../vues/Login/Login.vue'


// 主页的二级路由
import Hot from './../vues/Home/children/Hot/Hot.vue'
import Clothes from './../vues/Home/children/Clothes/Clothes.vue'
import InnerClothes from './../vues/Home/children/InnerClothes/InnerClothes.vue'

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/home', 
      component: Home,
      children: [
        {path: 'hot', component: Hot, meta: {showTab: true} },
        {path: 'clothes', component: Clothes, meta: {showTab: true}},
        {path: 'InnerClothes', component: InnerClothes},
        {path: '/home', redirect: '/home/hot'}
      ],
    },
    {path: '/recommend', component: Recommend, meta: {showTab: true}},
    {path: '/search', component: Search, meta: {showTab: true}},
    {path: '/cart',component: Cart, meta: {showTab: true}},
    {path: '/login', component: Login},
    {path: '/me', component: Me, meta: {showTab: true}},
    {path: '/', redirect: '/home'}
  ]
});