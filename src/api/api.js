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
