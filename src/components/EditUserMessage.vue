<template>
  <el-card class="choices" style="width: 60%">
    <div slot="header"><b>用户信息管理</b></div>
    <username v-bind:user-id="userMessage.id" v-bind:big="true"></username>
    <div style="text-align: center">
      个人说明:
      <el-input v-model="userMessage.instruction"
                style="margin: 3%; width: 60%"></el-input>
    </div>
    <div style="text-align: center">
      个人邮箱:
      <el-input v-model="userMessage.mail"
                style="margin: 3%; width: 60%"></el-input>
    </div>
    <div style="text-align: right">
      <el-button type="info" round plain @click="saveMessage">提交信息</el-button>
    </div>
  </el-card>
</template>

<script>
import {findUserMessage, saveUserMessage} from '../api/api'
import Username from './Username'

export default {
  name: 'EditUserMessage',
  components: {Username},
  data () {
    return {
      userMessage: {
        id: this.$store.state.login.id,
        watch: null,
        love: null,
        instruction: null,
        mail: null,
        icon: null
      }
    }
  },
  methods: {
    saveMessage () {
      saveUserMessage(this.userMessage)
        .then(res => { this.$message.success('保存成功') })
    }
  },
  created () {
    findUserMessage({}, this.$store.state.login.id)
      .then(res => {
        this.userMessage = res.result
        console.log(res.result)
      })
    console.log(this.userMessage)
  }
}
</script>

<style scoped>
.choices {
  position: fixed;
  /*margin-left: 35%;*/
  /*left: -650px;*/
  margin-left: 2%;
  top: 150px;
  width: 250px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
