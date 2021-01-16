<template>
  <div>
    <h3 v-if="big"
        @click="jump(userId)"
        style="text-align: center">{{username}}</h3>
    <b @click="jump(userId)"
       v-else
       style="font-size: 4px;">{{username}}</b>
  </div>
</template>

<script>
import { getUsernameByUserId } from '../api/api'

export default {
  name: 'Username',
  props: ['userId', 'big'],
  data () {
    return {
      username: ''
    }
  },
  methods: {
    jump (userId) {
      this.$router.replace({path: '/userHome/' + userId})
    }
  },
  created () {
    console.log(this.$props.userId)
    getUsernameByUserId({}, this.$props.userId)
      .then(res => { this.username = res.result })
  }
}
</script>

<style scoped>

</style>
