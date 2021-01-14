export default {
  state: {
    userList:
    [
      {
        id: null,
        username: null,
        watch: null,
        love: null
      }
    ]
  },
  mutations: {
    refreshUserItems (state, playLoad) {
      while (state.userList.length !== 0) {
        state.userList.pop()
      }
      for (let i = 0; i < playLoad.list.length; i++) {
        state.userList.push(playLoad.list[i])
      }
    }
  }
}
