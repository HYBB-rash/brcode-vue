<template>
  <el-avatar :src="icon"></el-avatar>
</template>

<script>
export default {
  name: 'UserIcon',
  props: ['userId'],
  data () {
    return {
      icon: 'http://localhost:8433/img/1.jpg'
    }
  },
  created () {
    this.$axios
      .request('/UserMessage/icon/' + this.$props.userId)
      .then(successResponse => {
        if (successResponse.data.code === 200) {
          this.icon = 'http://localhost:8433/' + successResponse.data.result
        }
      })
  }
}
</script>

<style scoped>

</style>
