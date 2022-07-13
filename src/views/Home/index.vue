<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header
      ><h2>后台管理系统</h2>
      <el-button type="warning" @click="logout">退出</el-button></el-header
    >
    <!-- 头部 -->
    <el-container>
      <!-- 侧边导航栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          background-color="#8785a2"
          text-color="#f6f6f6"
          :collapse-transition="false"
          default-active="/home/users"
          unique-opened
          router
        >
          <!-- 展开折叠图标 -->
          <div @click="isCollapse = !isCollapse" class="closeOrOpen">
            <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
          </div>
          <!-- 展开折叠图标 -->
          <!-- 导航栏 -->
          <el-submenu
            :index="item.order.toString()"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconList[item.order - 1]"></i>
              <span slot="title">{{ item.authName }}</span>
            </template>
            <el-menu-item
              @click="itemClick(item.authName, item1.authName)"
              :index="'/home' + '/' + item1.path"
              v-for="item1 in item.children"
              :key="item1.id"
              ><i class="el-icon-s-help"></i> {{ item1.authName }}</el-menu-item
            >
          </el-submenu>

          <!-- 导航栏 -->
        </el-menu>
      </el-aside>
      <!-- 侧边导航栏 -->
      <!-- 主体区域 -->
      <el-main>
        <BreadCrumb v-if="$route.path !== '/home'"></BreadCrumb>
        <h2 v-else>welcome</h2>
        <router-view class="main"></router-view>
      </el-main>
      <!-- 主体区域 -->
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  created () {
    this.$store.dispatch('authority/getMenuList')
    this.routeList = this.$router.options.routes[2].children
  },
  data () {
    return {
      isBreadCrumbShow: false,
      // 控制侧边导航栏的折叠与展开true为展开
      isCollapse: false,
      iconList: ['el-icon-user-solid', 'el-icon-lock', 'el-icon-s-goods', 'el-icon-s-order', 'el-icon-data-line'],
      routeList: {},
      currentList: []
    }
  },
  methods: {
    // 退出登录
    logout () {
      this.$store.commit('user/delUser')
      this.$router.push('/login')
    },
    itemClick (item, item1) {
      this.currentList = [item, item1]
      this.$store.commit('nav/setNav', this.currentList)
    }
  },
  computed: {
    ...mapGetters(['menuList'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.container {
  height: 100vh;
  // 头部布局
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
  // 侧边栏
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
      /deep/.is-active,
      .is-active > i {
        color: #f38181;
      }
    }
  }
  // 主体区域
  .el-main {
    background-color: #f6f6f6;
    padding: 20px;
  }
}
// 侧边导航栏设置
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-breadcrumb {
  margin-bottom: 15px;
}
.main {
  width: 100%;
  background-color: #fff;
  // height: 100%;
  padding: 20px;
  border-radius: 10px;
}
</style>
