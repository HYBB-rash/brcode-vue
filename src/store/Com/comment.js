export default {
  state: {
    paperId: null,
    userId: window.localStorage.getItem('login' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('login' || '[]')).id,
    content: null
  }
}
