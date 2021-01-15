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
import { getPaper } from '../api/api'

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
    getPaper({ip: this.ip}, this.$props.paperId)
      .then(res => {
        if (res.code === 200) {
          this.$store.commit({
            type: 'refreshPaper',
            paper: res.result
          })
        }
      })
  }
}
</script>

<style scoped>

</style>
