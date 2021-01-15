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
export default {
  name: 'Username',
  props: ['userId', 'username', 'big'],
  methods: {
    jump (userId) {
      this.$router.replace({path: '/userHome/' + userId})
    }
  }
}
</script>

<style scoped>

</style>
