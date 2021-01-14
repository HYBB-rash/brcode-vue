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
                  placeholder="请输入评论"></el-input>
        <div style="text-align: right">
          <el-button type="primary"
                     style="margin: 2% 1% 1%;"
                     plain round>提交评论</el-button>
        </div>
      </div>
      <div v-for="comment in comments" :key="comment.id">
        <Comment v-bind:comment="comment" style="margin: 2%"></Comment>
      </div>
    </el-card>
  </div>
</template>

<script>
import Comment from './Comment'
export default {
  name: 'Comments',
  components: {Comment},
  props: ['paperId'],
  data () {
    return {
      comments: this.$store.state.comments.comments
    }
  },
  created () {
    this.$axios
      .request('/paper/comment/' + this.$props.paperId)
      .then(successResponse => {
        if (successResponse.data.code === 200) {
          this.$store.commit({
            type: 'refreshComments',
            comments: successResponse.data.result
          })
        }
      })
  }
}
</script>

<style scoped>

</style>
