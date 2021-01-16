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
      <edit-user-message v-else-if="Number(show) === 2"></edit-user-message>
    </el-main>
  </el-container>
</template>

<script>
import Username from '../Username'
import PaperTable from '../PaperTable'
import CommentTable from '../CommentTable'
import EditUserMessage from '../EditUserMessage'

export default {
  name: 'UserAdminHome',
  components: {EditUserMessage, CommentTable, PaperTable, Username},
  data () {
    return {
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
