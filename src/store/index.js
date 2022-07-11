import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import user from './modules/user'
import authority from './modules/authority'
import nav from './modules/nav'
import getters from './getters'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    user,
    authority,
    nav
  },
  plugins: [vuexLocal.plugin]
})
