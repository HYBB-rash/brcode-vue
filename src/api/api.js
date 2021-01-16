import { get, post } from './http'

export const getUsernameByPaperId = (data, paperId) =>
  get('/UserMessage/' + paperId, data)

export const saveReply = (data) =>
  post('/reply/save', data)

export const getUsernameByUserId = (data, userId) =>
  get('/UserMessage/username/' + userId, data)

export const getReplyBaseByCommentId = (data, commentId) =>
  get('/comment/reply/' + commentId, data)

export const saveComment = (data) =>
  post('/comment/save', data)

export const getComments = (data, paperId) =>
  get('/paper/comment/' + paperId, data)

export const lovePaper = (data, paperId, userId) =>
  get('/paper/love/like/' + paperId + '/' + userId, data)

export const haveLove = (data, paperId, userId) =>
  get('/paper/love/' + paperId + '/' + userId, data)

export const loveCount = (data, paperId) =>
  get('/paper/love/' + paperId, data)

export const getPaper = (data, paperId) =>
  post('/paper/' + paperId, data)

export const getIcon = (data, userId) =>
  get('/UserMessage/icon/' + userId, data)

export const getUserMessage = (data, userId) =>
  get('/UserMessage/base/' + userId, data)

export const getUserInstruction = (data, userId) =>
  get('/UserMessage/instruction/' + userId, data)

export const getPaperListSortByTime = (data, index, size) =>
  get('/PaperList/time?index=' + index + '&size=' + size, data)

export const getPaperListSortByWatch = (data, index, size) =>
  get('/PaperList/watch?index=' + index + '&size=' + size, data)

export const getPaperListSortByLove = (data, index, size) =>
  get('/PaperList/love?index=' + index + '&size=' + size, data)

export const getUserPaperListSortByTime = (data, index, size, userId) =>
  get('/PaperList/' + userId + '/time?index=' + index + '&size=' + size, data)

export const getUserPaperListSortByWatch = (data, index, size, userId) =>
  get('/PaperList/' + userId + '/watch?index=' + index + '&size=' + size, data)

export const getUserPaperListSortByLove = (data, index, size, userId) =>
  get('/PaperList/' + userId + '/watch?index=' + index + '&size=' + size, data)

export const getPaperCount = (data) => get('/Page/count', data)

export const getPaperCountByUserId = (data, userId) => get('/Page/count/' + userId, data)

export const getUserCount = (data) => get('/Page/count/user', data)

export const getUserListSortByLove = (data, index, size) =>
  get('/UserList/love?index=' + index + '&size=' + size, data)

export const getUserListSortByWatch = (data, index, size) =>
  get('/UserList/watch?index=' + index + '&size=' + size, data)

export const getPaperEdit = (data) => post('/GetPaperContent', data)
