export default {
  state: {
    paperId: null,
    title: null,
    content: null
  },
  mutations: {
    refreshEditPaper (state, playLoad) {
      state.paperId = playLoad.paper.paperId
      state.title = playLoad.paper.title
      state.content = playLoad.paper.content
    }
  }
}
