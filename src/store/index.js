import Vue from 'vue'
import Vuex from 'vuex'
import loginStore from './Com/login'
import paperListStore from './Com/paperList'
import userMessageStore from './Com/userMessage'
import paperStore from './Com/paper'
import commentsStore from './Com/comments'
import editPaperStore from './Com/editPaper'
import userListStore from './Com/userList'
import commentStore from './Com/comment'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    login: loginStore,
    paperList: paperListStore,
    userMessage: userMessageStore,
    paper: paperStore,
    comments: commentsStore,
    editPaper: editPaperStore,
    userList: userListStore,
    comment: commentStore
  }
})
