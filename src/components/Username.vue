<template>
  <div>
    <b @click="jump(userId)"
       style="font-size: 4px">{{username}}</b>
  </div>
</template>

<script>
export default {
  name: 'Username',
  props: ['userId', 'username'],
  methods: {
    jump (userId) {
      this.$router.replace({path: '/userHome/' + userId})
    }
  }
}
</script>

<style scoped>

</style>
