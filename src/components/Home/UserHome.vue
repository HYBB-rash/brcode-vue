<template>
  <el-container>
    <el-main style="margin-left: 10%;margin-right: 10%">
      <el-card>
        <UserMessage style="margin: 5%;"
                     v-bind:user-id="userId"></UserMessage>
        <PaperList style="margin: 5%" v-bind:user-id="userId"></PaperList>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import PaperList from '../PaperList'
import UserMessage from '../UserMessage'
export default {
  name: 'UserHome',
  components: {PaperList, UserMessage},
  data () {
    return {
      userId: this.$route.params.userId
    }
  }
}
</script>

<style scoped>

</style>
