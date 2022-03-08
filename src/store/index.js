import Vue from 'vue'
import Vuex from 'vuex'
import {userStore} from './user-store.js'
import {boardStore} from './board-store.js'
Vue.use(Vuex)

export default new Vuex.Store({
  strict:true,
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    boardStore,
    userStore
  }
})
