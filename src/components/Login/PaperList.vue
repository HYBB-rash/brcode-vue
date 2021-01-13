<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>最新发布</span>
      <el-button style="float: right; padding: 3px 0">最新发布</el-button>
      <el-button style="float: right; padding: 3px 0">最多浏览</el-button>
      <el-button style="float: right; padding: 3px 0">最多关注</el-button>
    </div>
    <el-card v-for="paper in paperList" :key="paper.id">
      <div>{{paper.title}}</div>
      <div>{{paper.username}}</div>
      <div>{{paper.love}}</div>
      <div>{{paper.watch}}</div>
      <div>{{paper.time}}</div>
    </el-card>
  </el-card>
</template>

<script>
export default {
  name: 'PaperList',
  data () {
    return {
      paperList: this.$store.state.paperList.paperList
    }
  },
  beforeCreate () {
    this.$axios
      .request('/PaperList/time?index=0&size=3')
      .then(successResponse => {
        console.log(successResponse.data.result)
        if (successResponse.data.code === 200) {
          this.$store.commit({
            type: 'refreshPaperItems',
            list: successResponse.data.result
          })
        }
      })
  }
}
</script>

<style scoped>
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    width: 480px;
  }
</style>
