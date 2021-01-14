<template>
  <el-card>
<!--    <span>{{message.id}}</span>-->
<!--    小卡片-->
    <el-row v-if="small">
      <el-row>
        <div style="text-align: center">
          <user-icon
            v-bind:size="150"
            v-bind:userId="userId"></user-icon>
        </div>
      </el-row>
      <el-row style="min-height: 15%">
        <h3 style="text-align: center">
          {{message.username}}
        </h3>
      </el-row>
      <el-row style="min-height: 25px">
        <el-col :span="12">
          <div style="text-align: center">
            <span class="foot">浏览量：{{message.watch}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div style="text-align: center">
            <span class="foot">点赞数：{{message.love}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <div style="text-align: center">
          <b class="foot">邮箱：{{message.mail}}</b>
        </div>
      </el-row>
    </el-row>
<!--    直接展示-->
    <el-row v-else>
      <el-col :span="4">
        <div style="text-align: center">
          <user-icon v-bind:userId="userId"></user-icon>
        </div>
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
import UserIcon from './UserIcon'
export default {
  name: 'UserMessage',
  components: {UserIcon},
  props: ['small'],
  data () {
    return {
      userId: 4,
      message: this.$store.state.userMessage,
      instruction: ''
    }
  },
  methods: {},
  created () {
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
.foot {
  font-size: 4px;
}
</style>
