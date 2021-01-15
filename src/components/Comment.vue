<template>
  <el-card>
    <el-row v-if="comment.commentId !== null">
      <Re v-bind:comment="Re"
          v-if="Re"
          style="margin: 3%"></Re>
    </el-row>
    <el-row v-if="comment.status">
      <el-col :span="2">
        <user-icon v-bind:size="45" v-bind:user-id="comment.userId"></user-icon>
      </el-col>
      <el-col :span="18">
        <el-row>{{username}}</el-row>
        <el-row style="margin-top: 5%">
          <el-col :span="22">{{comment.content}}</el-col>
          <el-col :span="2">
            <el-button type="text" @click="replyInput">回复</el-button>
          </el-col>
        </el-row>
        <el-row v-if="inputController">
          <el-input type="textarea"
                    maxlength="200"
                    show-word-limit
                    v-model="reply.content"
                    placeholder="请输入评论"></el-input>
          <div style="text-align: right">
            <el-button type="primary"
                       style="margin: 2% 1% 1%;"
                       @click="saveReply"
                       plain round>提交评论</el-button>
          </div>
        </el-row>
      </el-col>
    </el-row>
    <el-row v-else>
      <span>该评论已删除</span>
    </el-row>
  </el-card>
</template>

<script>
import Re from './Re'
import UserIcon from './UserIcon'
import { saveReply, getUsernameByUserId, getReplyBaseByCommentId } from '../api/api'

export default {
  name: 'Comment',
  props: ['comment', 'paperId'],
  components: {Re, UserIcon},
  data () {
    return {
      username: 'null',
      Re: null,
      inputController: false,
      reply: {
        paperId: this.$props.paperId,
        userId: this.$store.state.login.id,
        content: null,
        commentId: this.$props.comment.id
      }
    }
  },
  methods: {
    replyInput () {
      this.inputController = true
    },
    saveReply () {
      if (this.comment.content === null) {
        this.$message.error('请先输入评论')
        return
      }
      saveReply(this.reply)
        .then(res => {
          if (res.code === 200) {
            this.$message.success('评论成功')
            this.reply.content = null
          }
        })
    }
  },
  created () {
    getUsernameByUserId({}, this.$props.comment.userId)
      .then(res => {
        this.username = res.result
      })
    getReplyBaseByCommentId({}, this.$props.comment.commentId)
      .then(res => {
        this.Re = res.result
      })
  }
}
</script>

<style scoped>

</style>
