import Vue from 'vue'
import Vuex from 'vuex'
import loginStore from './Com/login'
import paperListStore from './Com/paperList'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    login: loginStore,
    paperList: paperListStore
  }
})
