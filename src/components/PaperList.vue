<template>
  <el-card>
    <div slot="header" class="clearfix">
      <el-row>
        <el-col :span="6"><b>{{header[status]}}</b></el-col>
        <el-col :span="18">
          <el-row :gutter="10">
<!--            <el-col :span="6"></el-col>-->
            <el-col :offset="3" :span="7">
              <el-button type="primary"
                         size="mini"
                         @click="useTime"
                         class="left-font"
                         round plain>最新</el-button>
            </el-col>
            <el-col :span="7">
              <el-button type="success"
                         size="mini"
                         @click="useWatch"
                         class="left-font" round plain>最热</el-button>
            </el-col>
            <el-col :span="7">
              <el-button type="info"
                         size="mini"
                         @click="useLove"
                         class="left-font" round plain>高赞</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div style="min-height: 450px">
      <el-card v-for="paper in paperList"
               :key="paper.id"
               style="margin-top: 3%">
        <div slot="header" class="clearfix">
          <paper-title v-bind:title="paper.title"
                       v-bind:paper-id="paper.id"></paper-title>
          <span class="left-font text">作者：{{paper.username}}</span>
        </div>
        <div slot="default" class="clearfix">
          <span class="left-font text item">点赞：{{paper.love}}</span>
          <span class="left-font text item">浏览：{{paper.watch}}</span>
          <!--        <span class="left-font text item">最后修改时间：{{paper.time}}</span>-->
        </div>
      </el-card>
    </div>
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
import PaperTitle from './PaperTitle'
import { getPaperListSortByLove, getPaperListSortByWatch, getPaperListSortByTime,
  getUserPaperListSortByLove, getUserPaperListSortByTime, getUserPaperListSortByWatch,
  getPaperCount, getPaperCountByUserId} from '../api/api'

export default {
  name: 'PaperList',
  props: ['userId'],
  components: {PaperTitle},
  data () {
    return {
      paperList: this.$store.state.paperList.paperList,
      para: ['/time', '/love', '/watch'],
      url: '/PaperList',
      index: 0,
      size: 3,
      total: 0,
      header: ['最新发布', '最多关注', '最多浏览'],
      status: 0,
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
    useTime () {
      if (Number(this.$props.userId) === -1) {
        getPaperListSortByTime({}, this.index, this.size)
          .then(res => { this.refreshPaperList(res) })
      } else {
        getUserPaperListSortByTime({}, this.index, this.size, this.$props.userId)
          .then(res => { this.refreshPaperList(res) })
      }
      this.status = 0
    },
    useLove () {
      if (Number(this.$props.userId) === -1) {
        getPaperListSortByLove({}, this.index, this.size)
          .then(res => { this.refreshPaperList(res) })
      } else {
        getUserPaperListSortByLove({}, this.index, this.size, this.$props.userId)
          .then(res => { this.refreshPaperList(res) })
      }
      this.status = 1
    },
    useWatch () {
      if (Number(this.$props.userId) === -1) {
        getPaperListSortByWatch({}, this.index, this.size)
          .then(res => { this.refreshPaperList(res) })
      } else {
        getUserPaperListSortByWatch({}, this.index, this.size, this.$props.userId)
          .then(res => { this.refreshPaperList(res) })
      }
      this.status = 2
    },
    changPage () {
      this.index = this.currentPage - 1
      if (this.status === 0) {
        this.useTime()
      } else if (this.status === 1) {
        this.useLove()
      } else if (this.status === 2) {
        this.useWatch()
      }
    }
  },
  created () {
    if (Number(this.$props.userId) === -1) {
      getPaperCount({})
        .then(res => { this.total = res.result })
      getPaperListSortByTime({}, 0, 3)
        .then(res => { this.refreshPaperList(res) })
    } else {
      getPaperCountByUserId({}, this.$props.userId)
        .then(res => { this.total = res.result })
      getUserPaperListSortByTime({}, 0, 3, this.$props.userId)
        .then(res => { this.refreshPaperList(res) })
    }
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
