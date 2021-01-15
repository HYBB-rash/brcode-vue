<template>
  <el-container>
    <el-aside style="margin-left: 3%;" width="23%">
      <UserMessage v-bind:user-id="userId"
                   v-bind:small="true" class="card"></UserMessage>
      <PaperList class="card"
                 v-bind:user-id="userId"></PaperList>
    </el-aside>
    <el-main style="margin-right: 3%">
      <Paper v-bind:paper-id="paperId"></Paper>
      <Comments v-bind:paper-id="paperId" class="card"></Comments>
    </el-main>
  </el-container>
</template>

<script>
import UserMessage from '../UserMessage'
import PaperList from '../PaperList'
import Paper from '../Paper'
import Comments from '../Comments'
export default {
  name: 'PaperPage',
  components: {UserMessage, PaperList, Paper, Comments},
  data () {
    return {
      userId: this.$route.params.userId,
      paperId: this.$route.params.paperId
    }
  },
  watch: {
    '$route' (to, from) {
      this.paperId = to.paperId
      this.userId = to.userId
    }
  }
}
</script>

<style scoped>
 .card {
   margin: 4% 2% 4%;
 }
</style>
