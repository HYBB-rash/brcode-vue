<template>
  <el-card>
    <div v-for="comment in comments" :key="comment.id">
      <Comment v-bind:comment="comment" style="margin: 2%"></Comment>
    </div>
  </el-card>
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
