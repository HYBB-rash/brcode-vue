export default {
  state: {
    id: null,
    username: null,
    watch: null,
    love: null,
    mail: null
  },
  mutations: {
    refreshUserMessage (state, playLoad) {
      state.id = playLoad.message.id
      state.username = playLoad.message.username
      state.watch = playLoad.message.watch
      state.love = playLoad.message.love
      state.mail = playLoad.message.mail
    }
  }
}
