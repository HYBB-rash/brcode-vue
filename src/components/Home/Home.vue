<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="12">
          <UserList style="margin: 3%"></UserList>
        </el-col>
        <el-col :span="12">
          <PaperList user-id="-1" style="margin: 3%"></PaperList>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import UserList from '../UserList'
import PaperList from '../PaperList'
export default {
  name: 'Home',
  components: {UserList, PaperList}
}
</script>

<style scoped>

</style>
