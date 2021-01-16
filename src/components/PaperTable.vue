<template>
  <el-card class="choices" style="width: 70%;">
    <!--        <div>{{this.paperList}}</div>-->
    <div slot="header">
      <b>文章管理</b>
    </div>
    <el-table :data="paperList"
              border>
      <el-table-column
        prop="title"
        label="标题"></el-table-column>
      <el-table-column
        prop="watch"
        width="80px"
        label="浏览量"></el-table-column>
      <el-table-column
        prop="love"
        width="80px"
        label="点赞"></el-table-column>
      <el-table-column
        prop="time"
        label="最后修改时间"></el-table-column>
      <el-table-column
        prop="id"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editPaper(scope.row.id)" >编辑文章</el-button>
          <el-button type="text" size="small" @click="deletePaper(scope.row.id)" >删除文章</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center">
      <el-pagination layout="prev, pager, next"
                     :current-page.sync="currentPage"
                     :page-size="size"
                     @current-change="changPage"
                     :total="total" background>
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import {deletePaper, getPaperCountByUserId, getPaperEdit, getUserPaperListSortByTime} from '../api/api'

export default {
  name: 'PaperTable',
  data () {
    return {
      paperList: this.$store.state.paperList.paperList,
      userId: this.$store.state.login.id,
      index: 0,
      size: 6,
      total: 0,
      currentPage: 1
    }
  },
  methods: {
    refreshPaperList (res) {
      if (res.code === 200) {
        this.$store.commit({
          type: 'refreshPaperItems',
          list: res.result
        })
      }
    },
    getPaperList () {
      getUserPaperListSortByTime({}, this.index, this.size, this.userId)
        .then(res => { this.refreshPaperList(res) })
    },
    changPage () {
      this.index = this.currentPage - 1
      this.getPaperList()
    },
    editPaper (paperId) {
      getPaperEdit({
        paperId: paperId,
        userId: this.userId
      })
        .then(res => {
          if (res.code === 200) {
            this.$store.commit({
              type: 'refreshEditPaper',
              paper: res.result
            })
            this.$router.replace('/editPage')
          }
        })
    },
    deletePaper (paperId) {
      deletePaper({}, paperId)
        .then(res => {
          if (res.result) this.$message.success('删除成功')
          else this.$message.error('删除失败')
        })
      // getPaperCountByUserId({}, this.userId)
      //   .then(res => { this.total = res.result })
      // getUserPaperListSortByTime({}, 0, 10, this.userId)
      //   .then(res => { this.refreshPaperList(res) })
    }
  },
  created () {
    getPaperCountByUserId({}, this.userId)
      .then(res => { this.total = res.result })
    getUserPaperListSortByTime({}, 0, 10, this.userId)
      .then(res => { this.refreshPaperList(res) })
  }
}
</script>

<style scoped>

</style>
