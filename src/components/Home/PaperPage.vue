<template>
  <el-container>
    <el-aside style="margin-left: 3%;" width="23%">
      <UserMessage user-id="2" v-bind:small="true" class="card"></UserMessage>
      <PaperList class="card" user-id="2"></PaperList>
    </el-aside>
    <el-main style="margin-right: 3%">
      <Paper class="card" v-bind:paper-id="2"></Paper>
      <Comments paper-id="2" class="card"></Comments>
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
  components: {UserMessage, PaperList, Paper, Comments}
}
</script>

<style scoped>
 .card {
   margin: 4% 2% 4%;
 }
</style>
