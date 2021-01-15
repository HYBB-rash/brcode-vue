<template>
  <div>
    <el-card>
      <div slot="header" style="text-align: center">
        <h1>{{paper.title}}</h1>
      </div>
      <div class="markdown-body">
        <VueMarkdown :source="paper.content" v-highlight></VueMarkdown>
      </div>
      <div>
        <love v-bind:paper-id="paperId"></love>
      </div>
    </el-card>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import Love from './Love'
export default {
  name: 'Paper',
  props: ['paperId'],
  components: {
    VueMarkdown, Love
  },
  data () {
    return {
      paper: this.$store.state.paper,
      ip: null
    }
  },
  beforeCreate () {
  },
  created () {
    this.ip = localStorage.getItem('Ip')
    this.$axios
      .post('/paper/' + this.$props.paperId, {
        ip: this.ip
      })
      .then(successResponse => {
        // console.log(successResponse.data.result)
        if (successResponse.data.code === 200) {
          this.$store.commit({
            type: 'refreshPaper',
            paper: successResponse.data.result
          })
        }
      })
  }
}
</script>

<style scoped>

</style>
