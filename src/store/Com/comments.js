export default {
  state: {
    comments: [
      {
        id: null,
        commentId: null,
        userId: null,
        status: null,
        content: null,
        time: null
      }
    ],
    Re: null
  },
  mutations: {
    refreshComments (state, playLoad) {
      while (state.comments.length > 0) {
        state.comments.pop()
      }
      for (let i = 0; i < playLoad.comments.length; i++) {
        state.comments.push(playLoad.comments[i])
      }
    },
    getContentAndUserId (state, playLoad) {
      let commentId = playLoad.commentId
      for (let i = 0; i < state.comments.length; i++) {
        if (commentId === state.comments[i].id) {
          state.Re = state.comments[i]
          return
        }
      }
    }
  }
}
