<template>
  <el-card class="choices" style="width: 70%;">
    <!--        <div>{{this.paperList}}</div>-->
    <div slot="header">
      <b>评论管理</b>
    </div>
    <el-table :data="commentList"
              border>
      <el-table-column
        prop="userId"
        width="120px"
        label="用户">
        <template slot-scope="scope">
          <username v-bind:user-id="scope.row.userId"></username>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        width="80px"
        label="状态">
        <template slot-scope="scope">
          <div v-if="scope.row.status === 0">
            已删除
          </div>
          <div v-else>正常</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        width="220px"
        label="评论内容"></el-table-column>
      <el-table-column
        prop="time"
        label="最后修改时间"></el-table-column>
      <el-table-column
        prop="id"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteComment(scope.row.id)" >删除评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center">
      <el-pagination layout="prev, pager, next"
                     :current-page.sync="currentPage"
                     :page-size="size"
                     @current-change="changePage"
                     :total="total" background>
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import {deleteCommentByCommentId, getAllComments, getCommentCount} from '../api/api'
import Username from './Username'

export default {
  name: 'CommentTable',
  components: {Username},
  data () {
    return {
      commentList: this.$store.state.comments.comments,
      userId: this.$store.state.login.id,
      index: 0,
      size: 6,
      total: 0,
      currentPage: 1
    }
  },
  methods: {
    refreshCommentList (res) {
      if (res.code === 200) {
        this.$store.commit({
          type: 'refreshComments',
          comments: res.result
        })
      }
    },
    getComments () {
      getAllComments({}, this.userId, this.index, this.size)
        .then(res => { this.refreshCommentList(res) })
    },
    deleteComment (commentId) {
      deleteCommentByCommentId({}, commentId)
        .then(res => { this.$message.success('删除成功') })
    },
    changePage () {
      this.index = this.currentPage - 1
      this.getComments()
    }
  },
  created () {
    getCommentCount({}, this.userId)
      .then(res => { this.total = res.result })
    getAllComments({}, this.userId, 0, 6)
      .then(res => { this.refreshCommentList(res) })
  }
}
</script>

<style scoped>
.choices {
  position: fixed;
  /*margin-left: 35%;*/
  /*left: -650px;*/
  margin-left: 2%;
  top: 150px;
  width: 250px;
}
</style>
