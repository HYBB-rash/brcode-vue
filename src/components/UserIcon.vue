<template>
  <el-avatar :src="icon" :size="size"></el-avatar>
</template>

<script>
import { getIcon } from '../api/api'

export default {
  name: 'UserIcon',
  props: ['userId', 'size'],
  data () {
    return {
      icon: 'http://localhost:8433/img/1.jpg'
    }
  },
  created () {
    getIcon({}, this.$props.userId)
      .then(res => {
        if (res.code === 200) {
          this.icon = 'http://localhost:8433/' + res.result
        }
      })
  }
}
</script>

<style scoped>

</style>
