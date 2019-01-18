import Vue from 'vue'
import Vuex from 'vuex'

import action from './action'
import mutation from './mutation'
import state from './state'

Vue.use(Vuex);

export default new Vuex.Store({
  actions: action,
  mutations: mutation,
  state
});
