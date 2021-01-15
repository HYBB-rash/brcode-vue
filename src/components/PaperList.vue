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
    genUrl (type) {
      let request
      if (Number(this.$props.userId) === -1) {
        request = this.url + this.para[type] + '?' + 'index=' + this.index + '&' + 'size=' + this.size
      } else {
        request = this.url + '/' + this.$props.userId + this.para[type] + '?' + 'index=' + this.index + '&' + 'size=' + this.size
      }
      return request
    },
    refresh (request) {
      this.$axios(request)
        .then(successResponse => {
          console.log(successResponse.data.result)
          if (successResponse.data.code === 200) {
            this.$store.commit({
              type: 'refreshPaperItems',
              list: successResponse.data.result
            })
          }
        })
    },
    useTime () {
      let request = this.genUrl(0)
      this.refresh(request)
      this.status = 0
    },
    useLove () {
      let request = this.genUrl(1)
      this.refresh(request)
      this.status = 1
    },
    useWatch () {
      let request = this.genUrl(2)
      this.refresh(request)
      this.status = 2
    },
    changPage () {
      console.log(this.currentPage)
      this.index = this.currentPage - 1
      let genUrl = this.genUrl(this.status)
      this.refresh(genUrl)
    }
  },
  beforeCreate () {
  },
  created () {
    let url
    if (Number(this.$props.userId) === -1) {
      url = '/PaperList/time?index=0&size=3'
    } else {
      url = '/PaperList/' + this.$props.userId + '/time?index=0&size=3'
    }
    this.$axios
      .request(url)
      .then(successResponse => {
        console.log(successResponse)
        if (successResponse.data.code === 200) {
          this.$store.commit({
            type: 'refreshPaperItems',
            list: successResponse.data.result
          })
        }
      })
    let countUrl = '/Page/count'
    if (Number(this.userId) === -1) countUrl = '/Page/count'
    else countUrl = '/Page/count/' + this.$props.userId
    console.log(countUrl)
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
