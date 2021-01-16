<template>
  <el-container>
    <el-aside>
      <el-menu
        class="choices"
        default-active="0"
        @select="handleSelect"
        active-text-color="red"
        style="box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1)">
        <el-menu-item index="0">
          <i class="el-icon-question"></i>
          <span slot="title">文章管理</span>
        </el-menu-item>
        <el-menu-item index="1">
          <i class="el-icon-check"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-user"></i>
          <span slot="title">用户信息管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <paper-table v-if="Number(show) === 0"></paper-table>
      <comment-table v-else-if="Number(show) === 1"></comment-table>
<!--      <el-card v-else-if="Number(show) === 1" class="choices" style="width: 70%">-->
<!--        <div slot="header">-->
<!--          <b>评论管理</b>-->
<!--        </div>-->
<!--        <el-table :data="commentList"-->
<!--                  border>-->
<!--          <el-table-column-->
<!--            prop="status"-->
<!--            width="80px"-->
<!--            label="状态"></el-table-column>-->
<!--          <el-table-column-->
<!--            prop="content"-->
<!--            width="160px"-->
<!--            label="内容"></el-table-column>-->
<!--          <el-table-column-->
<!--            prop="time"-->
<!--            label="最后修改时间"></el-table-column>-->
<!--          <el-table-column-->
<!--            prop="id"-->
<!--            width="320px"-->
<!--            label="操作">-->
<!--            <template slot-scope="scope">-->
<!--              <el-button type="text" @click="scope.row.id" size="small">删除评论</el-button>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--        </el-table>-->
<!--      </el-card>-->
    </el-main>
  </el-container>
</template>

<script>
import Username from '../Username'
import PaperTable from '../PaperTable'
import CommentTable from '../CommentTable'

export default {
  name: 'UserAdminHome',
  components: {CommentTable, PaperTable, Username},
  data () {
    return {
      paperList: this.$store.state.paperList.paperList,
      commentList: this.$store.state.comments.comments,
      userId: this.$store.state.login.id,
      index: 0,
      size: 6,
      total: 0,
      currentPage: 1,
      show: 0
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
    refreshComment (res) {
      if (res.code === 200) {
        this.$store.commit({
          type: 'refreshComments',
          comments: res.result
        })
      }
    },
    handleSelect (key, keyPath) {
      this.show = key
      if (Number(key) === 0) {
        //   getPaperCountByUserId({}, this.userId)
        //     .then(res => { this.total = res.result })
        //   getUserPaperListSortByTime({}, 0, 10, this.userId)
        //     .then(res => { this.refreshPaperList(res) })
        // } else if (Number(key) === 1) {
        //   getAllComments({}, this.userId, 0, 10)
        //     .then(res => { this.refreshComment(res) })
        // }
      }
    },
    created () {
    }
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
