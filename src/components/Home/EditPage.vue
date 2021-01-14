<template>
  <el-container>
    <el-main>
      <el-card style="margin: 5%">
        <div slot="header">
          <h2>编辑</h2>
        </div>
        <el-row class="row-gap">
          <el-col :span="2"><h3 style="float: right">标题</h3></el-col>
          <el-col :offset="2" :span="18"><el-input v-model="title"></el-input></el-col>
        </el-row>
        <el-row class="row-gap">
          <mavon-editor v-model="content" :ishljs="true"></mavon-editor>
        </el-row>
        <el-row>
          <el-button type="info"
                     @click="saveAndSend"
                     plain round style="float: right;margin: 2%">保存并发布</el-button>
          <el-button type="info"
                     @click="save"
                     plain round style="float: right;margin: 2%">保存</el-button>
        </el-row>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'EditPage',
  data () {
    return {
      userId: 2,
      title: this.$store.state.editPaper.title,
      content: this.$store.state.editPaper.content
    }
  },
  methods: {
    save () {
      this.$axios
        .post('/SavePaperContent/' + this.userId, this.$store.state.editPaper)
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            this.$message.success('保存成功')
          }
        })
    },
    saveAndSend () {
      this.$store.state.editPaper.content = this.content
      this.$store.state.editPaper.title = this.title
      console.log(this.$store.state.editPaper)
      this.$axios
        .post('/SavePaperContentAndSend/' + this.userId, this.$store.state.editPaper)
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            this.$message.success('保存成功')
          }
        })
    }
  }
}
</script>

<style scoped>
  .row-gap{
    margin: 2%;
  }
</style>
