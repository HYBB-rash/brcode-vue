<template>
  <div>
    <b style="font-size: 4px" @click="jump(userId, paperId)">{{title}}</b>
  </div>
</template>

<script>
export default {
  name: 'PaperTitle',
  props: ['paperId', 'title'],
  data () {
    return {
      userId: null
    }
  },
  methods: {
    jump (userId, paperId) {
      this.$router.replace({path: '/page/' + userId + '/' + paperId})
    }
  },
  created () {
    this.$axios
      .request('/UserMessage/' + this.$props.paperId)
      .then(successResponse => {
        if (successResponse.data.code === 200) {
          this.userId = successResponse.data.result
        }
      })
  }
}
</script>

<style scoped>

</style>
