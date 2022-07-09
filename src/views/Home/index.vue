<template>
  <el-container class="container">
    <el-header
      ><h2>后台管理系统</h2>
      <el-button type="warning" @click="logout">退出</el-button></el-header
    >
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  created () { },
  data () {
    return {}
  },
  methods: {
    logout () {
      this.$store.commit('delUser')
      this.$router.push('/login')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.container {
  height: 100vh;
  .el-header {
    background-color: #8785a2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      font-size: 22px;
      color: #f6f6f6;
    }
  }
  .el-aside {
    background-color: #8785a2;
  }
  .el-main {
    background-color: #f6f6f6;
  }
}
</style>
