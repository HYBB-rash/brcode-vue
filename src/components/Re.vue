<template>
  <el-card>
    <el-row>
      <el-col :span="6">{{username}}:</el-col>
      <el-col :span="18">{{comment.content}}</el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'Re',
  props: ['comment'],
  data () {
    return {
      username: ''
    }
  },
  created () {
    this.$axios
      .request('/UserMessage/username/' + this.$props.comment.userId)
      .then(successResponse => {
        if (successResponse.data.code === 200) {
          this.username = successResponse.data.result
        }
      })
  }
}
</script>

<style scoped>

</style>
