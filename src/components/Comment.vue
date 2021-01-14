<template>
  <el-card>
    <el-row v-if="comment.commentId !== null">
      <Re v-bind:comment="Re"
          v-if="Re"
          style="margin: 3%"></Re>
    </el-row>
    <el-row v-if="comment.status">
      <el-col :span="2">
        <el-avatar :src="icon"></el-avatar>
      </el-col>
      <el-col :span="18">
        <el-row>{{username}}</el-row>
        <el-row>{{comment.content}}</el-row>
      </el-col>
    </el-row>
    <el-row v-else>
      <span>该评论已删除</span>
    </el-row>
  </el-card>
</template>

<script>
import Re from './Re'
export default {
  name: 'Comment',
  props: ['comment'],
  components: {Re},
  data () {
    return {
      icon: 'http://localhost:8433/',
      username: '',
      Re: null
    }
  },
  created () {
    this.$axios
      .request('/UserMessage/icon/' + this.$props.comment.userId)
      .then(successResponse => {
        if (successResponse.data.code === 200) {
          this.icon += successResponse.data.result
        }
      })
    this.$axios
      .request('/UserMessage/username/' + this.$props.comment.userId)
      .then(successResponse => {
        if (successResponse.data.code === 200) {
          this.username = successResponse.data.result
        }
      })
    if (this.$props.comment.commentId !== null) {
      this.$store.commit({
        type: 'getContentAndUserId',
        commentId: this.$props.comment.commentId
      })
      this.Re = this.$store.state.comments.Re
    }
  }
}
</script>

<style scoped>

</style>
