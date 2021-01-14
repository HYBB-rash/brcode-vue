export default {
  state: {
    id: null,
    title: null,
    content: null
  },
  mutations: {
    refreshPaper (state, playLoad) {
      state.id = playLoad.paper.paperId
      state.title = playLoad.paper.title
      state.content = playLoad.paper.content
    }
  }
}
