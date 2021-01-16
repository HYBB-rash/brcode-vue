<template>
  <el-card>
    <div slot="header" class="clearfix">
      <el-row>
        <el-col :span="6"><b>{{header[status]}}</b></el-col>
        <el-col :span="18">
          <el-row :gutter="10">
            <el-col :offset="10" :span="7">
              <el-button type="primary"
                         size="mini"
                         @click="useWatch"
                         class="left-font"
                         round plain>最热</el-button>
            </el-col>
            <el-col :span="7">
              <el-button type="success"
                         size="mini"
                         @click="useLove"
                         class="left-font"
                         round plain>高赞</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div style="min-height: 450px">
<!--      <div v-for="user in userList" :key="user.id + 3">-->
<!--        <div>{{user.username}}</div>-->
<!--      </div>-->
<!--      <div v-if="userList !== null">{{ userList }}</div>-->
      <el-card v-for="user in userList"
               :key="user.id"
               style="margin-top: 3%">
        <div slot="header" class="clearfix">
          <username v-bind:username="user.username"
                    v-bind:user-id="user.id"></username>
        </div>
        <div slot="default" class="clearfix">
          <span class="left-font text item">点赞:{{user.love}}</span>
          <span class="left-font text item">浏览:{{user.watch}}</span>
        </div>
      </el-card>
    </div>
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
import Username from './Username'
import { getUserListSortByLove, getUserListSortByWatch, getUserCount } from '../api/api'

export default {
  name: 'UserList',
  components: {Username},
  data () {
    return {
      userList: this.$store.state.userList.userList,
      index: 0,
      size: 3,
      total: 0,
      header: ['最多关注', '最多浏览'],
      status: 0,
      currentPage: 1
    }
  },
  methods: {
    refreshUserList (res) {
      if (res.code === 200) {
        this.$store.commit({
          type: 'refreshUserItems',
          list: res.result
        })
      }
    },
    useWatch () {
      getUserListSortByWatch({}, this.index, this.size)
        .then(res => { this.refreshUserList(res) })
      this.status = 1
    },
    useLove () {
      getUserListSortByLove({}, this.index, this.size)
        .then(res => { this.refreshUserList(res) })
      this.status = 0
    },
    changePage () {
      this.index = this.currentPage - 1
      if (this.status === 0) {
        this.useLove()
      } else if (this.status === 1) {
        this.useWatch()
      }
    }
  },
  beforeCreate () {
    getUserListSortByWatch({}, 0, 3)
      .then(res => { this.refreshUserList(res) })
  },
  created () {
    getUserCount({})
      .then(res => { this.total = res.result })
  }
}
</script>

<style scoped>
.text {
  font-size: 4px;
}
.item {
  float: bottom;
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
.left-font {
  float: right;
  /*padding: 1% 1%;*/
  margin: 1%;
}
</style>
