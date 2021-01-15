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
        <Username v-bind:user-id="message.id"
                  v-bind:big="true"
                  v-bind:username="message.username"></Username>
<!--        <h3 style="text-align: center">-->
<!--          {{message.username}}-->
<!--        </h3>-->
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
      <el-col :span="6">
        <div style="text-align: center">
          <user-icon v-bind:size="150" v-bind:userId="userId"></user-icon>
        </div>
        <Username v-bind:user-id="message.id"
                  v-bind:big="true"
                  v-bind:username="message.username"></Username>
<!--        <h3 style="text-align: center">{{message.username}}</h3>-->
      </el-col>
      <el-col :span="18">
        <div style="min-height: 170px">{{instruction}}</div>
        <el-row>
          <el-col :span="8">
            <div style="text-align: left">
              <span>浏览量：{{message.watch}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div style="text-align: left">
              <span>点赞数：{{message.love}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div style="text-align: left">
              <span>邮箱：{{message.mail}}</span>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import Username from './Username'
import UserIcon from './UserIcon'
import { getUserMessage, getUserInstruction } from '../api/api'

export default {
  name: 'UserMessage',
  components: {UserIcon, Username},
  props: ['small', 'userId'],
  data () {
    return {
      message: this.$store.state.userMessage,
      instruction: ''
    }
  },
  methods: {},
  created () {
    getUserMessage({}, this.$props.userId)
      .then(res => {
        if (res.code === 200) {
          this.$store.commit({
            type: 'refreshUserMessage',
            message: res.result
          })
        }
      })
    getUserInstruction({}, this.$props.userId)
      .then(res => {
        if (res.code === 200) {
          this.instruction = res.result
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
