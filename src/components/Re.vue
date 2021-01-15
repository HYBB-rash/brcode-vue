<template>
  <el-card>
    <el-row>
      <el-col :span="6">回复{{comment.username}}:</el-col>
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
  }
}
</script>

<style scoped>

</style>
