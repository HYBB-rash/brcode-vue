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
import { lovePaper, haveLove, loveCount } from '../api/api'

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
      if (this.userId === null) {
        this.$message.error('请先登录！')
        this.$router.replace({path: '/login'})
        return
      }
      lovePaper({}, paperId, this.userId)
        .then(res => {
          if (res.code === 200) {
            if (res.result) {
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
    haveLove({}, this.$props.paperId, this.userId)
      .then(res => {
        if (res.code === 200) {
          this.haveLove = res.result
        }
      })
    loveCount({}, this.$props.paperId)
      .then(res => {
        if (res.code === 200) {
          this.love = res.result
        }
      })
  }
}
</script>

<style scoped>

</style>
