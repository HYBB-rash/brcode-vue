<template>
  <div>
    <el-card>
      <div slot="header">
        <span>评论</span>
      </div>
      <div style="margin: 2% 2% 4%;">
        <el-input type="textarea"
                  maxlength="200"
                  show-word-limit
                  v-model="comment.content"
                  placeholder="请输入评论"></el-input>
        <div style="text-align: right">
          <el-button type="primary"
                     style="margin: 2% 1% 1%;"
                     @click="saveComment"
                     plain round>提交评论</el-button>
        </div>
      </div>
      <div v-for="comment in comments" :key="comment.id">
        <Comment v-bind:comment="comment"
                 v-bind:paper-id=paperId
                 style="margin: 2%"></Comment>
      </div>
    </el-card>
  </div>
</template>

<script>
import Comment from './Comment'
import { saveComment, getComments } from '../api/api'

export default {
  name: 'Comments',
  components: {Comment},
  props: ['paperId'],
  data () {
    return {
      comments: this.$store.state.comments.comments,
      comment: {
        paperId: this.$props.paperId,
        userId: this.$store.state.login.id,
        content: null
      }
    }
  },
  methods: {
    saveComment () {
      if (this.comment.content === null) {
        this.$message.error('请先输入评论')
        return
      }
      saveComment(this.comment)
        .then(res => {
          if (res.code === 200) {
            this.$message.success('评论成功')
            this.comment.content = null
            getComments({}, this.$props.paperId)
              .then(res => {
                if (res.code === 200) {
                  this.$store.commit({
                    type: 'refreshComments',
                    comments: res.result
                  })
                }
              })
          }
        })
    }
  },
  created () {
    getComments({}, this.$props.paperId)
      .then(res => {
        if (res.code === 200) {
          this.$store.commit({
            type: 'refreshComments',
            comments: res.result
          })
        }
      })
  }
}
</script>

<style scoped>

</style>
