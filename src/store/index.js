import Vue from 'vue'
import Vuex from 'vuex'
import loginStore from './Com/login'
import paperListStore from './Com/paperList'
import userMessageStore from './Com/userMessage'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    login: loginStore,
    paperList: paperListStore,
    userMessage: userMessageStore
  }
})
