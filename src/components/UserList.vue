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
          <b class="text">{{user.username}}</b>
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
export default {
  name: 'UserList',
  data () {
    return {
      userList: this.$store.state.userList.userList,
      para: ['/love', '/watch'],
      url: '/UserList',
      index: 0,
      size: 3,
      total: 0,
      header: ['最多关注', '最多浏览'],
      status: 0,
      currentPage: 1
    }
  },
  methods: {
    getUrl (type) {
      return this.url + this.para[type] + '?index=' + this.index + '&size=' + this.size
    },
    refresh (request) {
      this.$axios(request)
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            this.$store.commit({
              type: 'refreshUserItems',
              list: successResponse.data.result
            })
          }
        })
    },
    useWatch () {
      let url = this.getUrl(1)
      this.refresh(url)
      this.status = 1
    },
    useLove () {
      let url = this.getUrl(0)
      this.refresh(url)
      this.status = 0
    },
    changePage () {
      this.index = this.currentPage - 1
      let getUrl = this.getUrl(this.status)
      this.refresh(getUrl)
    }
  },
  beforeCreate () {
    this.$axios
      .request('/UserList/watch?index=0&size=3')
      .then(successResponse => {
        console.log(successResponse)
        if (successResponse.data.code === 200) {
          this.$store.commit({
            type: 'refreshUserItems',
            list: successResponse.data.result
          })
        }
      })
    console.log(this.userList)
  },
  created () {
    let countUrl = '/Page/count/user'
    this.$axios
      .request(countUrl)
      .then(successResponse => {
        if (successResponse.data.code === 200) {
          this.total = successResponse.data.result
          console.log(this.total)
        }
      })
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
