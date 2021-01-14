<template>
  <el-card>
<!--    <span>{{message.id}}</span>-->
    <el-row>
      <el-col :span="4">
        <div style="text-align: center"><el-avatar :src="icon"></el-avatar></div>
        <div style="text-align: center">{{message.username}}</div>
      </el-col>
      <el-col :span="20">
        <div style="min-height: 50px">{{instruction}}</div>
        <span>  浏览量：{{message.watch}}</span>
        <span>  点赞数：{{message.love}}</span>
        <span>  邮箱：{{message.mail}}</span>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'UserMessage',
  data () {
    return {
      userId: 4,
      message: this.$store.state.userMessage,
      instruction: '',
      icon: 'http://localhost:8433/'
    }
  },
  methods: {},
  created () {
    this.$axios
      .request('/UserMessage/icon/' + this.userId)
      .then(successResponse => {
        if (successResponse.data.code === 200) {
          this.icon += successResponse.data.result
        }
      })
    this.$axios
      .request('/UserMessage/base/' + this.userId)
      .then(successResponse => {
        if (successResponse.data.code === 200) {
          this.$store.commit({
            type: 'refreshUserMessage',
            message: successResponse.data.result
          })
        }
      })
    this.$axios
      .request('/UserMessage/instruction/' + this.userId)
      .then(successResponse => {
        if (successResponse.data.code === 200) {
          this.instruction = successResponse.data.result
        }
      })
  }
}
</script>

<style scoped>

</style>
