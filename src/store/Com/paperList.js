export default {
  state: {
    paperList:
      [
        // {
        //   id: null,
        //   title: null,
        //   username: null,
        //   love: null,
        //   watch: null,
        //   time: null
        // }
      ]
  },
  mutations: {
    refreshPaperItems (state, playLoad) {
      while (state.paperList.length !== 0) {
        state.paperList.pop()
      }
      for (let i = 0; i < playLoad.list.length; i++) {
        state.paperList.push(playLoad.list[i])
      }
    }
  }
}
