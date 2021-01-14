<template>
  <el-container>
    <el-card>
      <UserMessage></UserMessage>
      <PaperList></PaperList>
    </el-card>
  </el-container>
</template>

<script>
import PaperList from '../PaperList'
import UserMessage from '../UserMessage'
export default {
  name: 'UserHome',
  components: {PaperList, UserMessage}
}
</script>

<style scoped>

</style>
