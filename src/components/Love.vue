<template>
  <div style="text-align: right;margin: 3%">
    <el-row>
      <el-col :offset="22" :span="1">
        <i class="el-icon-star-on" v-if="haveLove"></i>
        <i class="el-icon-star-off" @click="loveThis(paperId)" v-else></i>
      </el-col>
      <el-col :span="1">
        <div>{{love}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Love',
  props: ['paperId'],
  data () {
    return {
      haveLove: false,
      userId: this.$store.state.login.id,
      love: 0
    }
  },
  methods: {
    loveThis (paperId) {
      this.$axios
        .request('/paper/love/like/' + paperId + '/' + this.userId)
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            if (successResponse.data.result) {
              this.$message.success('点赞成功')
              this.haveLove = true
              this.love += 1
            } else {
              this.$message.error('点暂失败')
            }
          }
        })
    }
  },
  created () {
    this.$axios
      .request('/paper/love/' + this.$props.paperId + '/' + this.userId)
      .then(successResponse => {
        if (successResponse.data.code === 200) {
          this.haveLove = successResponse.data.result
        }
      })
    this.$axios
      .request('/paper/love/' + this.$props.paperId)
      .then(successResponse => {
        if (successResponse.data.code === 200) {
          this.love = successResponse.data.result
        }
      })
  }
}
</script>

<style scoped>

</style>
