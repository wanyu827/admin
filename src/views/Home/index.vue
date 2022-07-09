<template>
  <el-container class="container">
    <el-header
      ><h2>后台管理系统</h2>
      <el-button type="warning" @click="logout">退出</el-button></el-header
    >
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          background-color="#8785a2"
          text-color="#f6f6f6"
          :collapse-transition="false"
          default-active="1-1"
          unique-opened
        >
          <div @click="isCollapse = !isCollapse" class="closeOrOpen">
            <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
          </div>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item index="1-1"
              ><i class="el-icon-s-help"></i> 用户列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i :class="isCollapse ? 'el-icon-lock' : 'el-icon-unlock'"></i>
              <span slot="title">权限管理</span>
            </template>
            <el-menu-item index="2-1"
              ><i class="el-icon-s-help"></i>角色列表</el-menu-item
            >
            <el-menu-item index="2-2"
              ><i class="el-icon-s-help"></i>权限列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-shop"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item index="3-1"
              ><i class="el-icon-s-help"></i>商品列表</el-menu-item
            >
            <el-menu-item index="3-1"
              ><i class="el-icon-s-help"></i>分类参数</el-menu-item
            >
            <el-menu-item index="3-1"
              ><i class="el-icon-s-help"></i>商品分类</el-menu-item
            >
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span slot="title">订单管理</span>
            </template>
            <el-menu-item index="4-1"
              ><i class="el-icon-s-help"></i>订单列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-data-line"></i>
              <span slot="title">数据统计</span>
            </template>
            <el-menu-item index="5-1"
              ><i class="el-icon-s-help"></i>数据报表</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  created () { },
  data () {
    return {
      isCollapse: false
    }
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
    .el-menu {
      border-right: none;
      .closeOrOpen {
        color: #f6f6f6;
        background-color: #f38181;
        text-align: center;
        height: 35px;
        line-height: 35px;
        i {
          font-size: 20px;
        }
      }
      i {
        color: #f6f6f6;
      }
      /deep/.is-active {
        color: #f38181;
        .el-icon-s-help {
          color: #f38181 !important;
        }
      }
    }
  }
  .el-main {
    background-color: #f6f6f6;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
