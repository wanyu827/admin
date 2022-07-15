<template>
  <div>
    <el-input placeholder="请输入内容" v-model="input" clearable class="search">
      <template #append>
        <el-button @click="search"><i class="el-icon-search"></i></el-button>
      </template>
    </el-input>
    <el-button type="primary" @click="dialogFormVisible = true"
      >添加用户</el-button
    >
    <!-- 表格 -->
    <UserTable></UserTable>
    <!-- 分页 -->
    <Pagination></Pagination>
    <!-- 添加用户弹出 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="formAddUser" :rules="rules" label-width="80px">
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            autocomplete="off"
            v-model="formAddUser.username"
          ></el-input>
        </el-form-item>
        <!-- 用户名 -->
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input
            type="text"
            autocomplete="off"
            v-model="formAddUser.password"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input
            type="text"
            autocomplete="off"
            v-model="formAddUser.email"
          ></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <!-- 手机号 -->
        <el-form-item label="手机号" prop="mobile">
          <el-input
            type="text"
            autocomplete="off"
            v-model="formAddUser.mobile"
          ></el-input>
        </el-form-item>
        <!-- 手机号 -->
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加用户弹出 -->
  </div>
</template>

<script>
import { validMobile, validEmail } from '@/utils/validate'
import UserTable from './components/UserTable.vue'

export default {
  name: 'UserList',
  created () {
    // 获取用户数据列表
    this.$store.dispatch('user/getUserInfoList', { pagenum: this.$store.state.user.pagenum, pagesize: this.$store.state.user.pagesize })
  },
  data () {
    // 手机格式校验
    const validateMobile = (rule, value, callback) => {
      validMobile(value) ? callback() : callback(new Error('手机号格式不正确'))
    }
    // 邮箱格式校验
    const validateEmail = (rule, value, callback) => {
      validEmail(value) ? callback() : callback(new Error('邮箱格式不正确'))
    }
    return {
      input: '',
      dialogFormVisible: false,
      formAddUser: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        // 用户名校验规则
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
        ],
        // 密码校验规则
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
        ],
        // 邮箱校验规则
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        // 手机号校验规则
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 搜索
    search () {
      console.log(this.input)
      const pagenum = this.$store.state.user.pagenum
      const pagesize = this.$store.state.user.pagesize
      this.$store.dispatch('user/getUserInfoList', { query: this.input, pagenum, pagesize })
    },
    // 添加用户确认按钮点击事件
    addUser () {
      this.$store.dispatch('user/addUser', this.formAddUser)
      this.dialogFormVisible = false
    }

  },
  computed: {},
  watch: {
    /*   pagenum () {
        this.$store.dispatch('user/getUserInfoList', { pagenum: this.pagenum, pagesize: this.pagesize })
      },
      pagesize () {
        this.$store.dispatch('user/getUserInfoList', { pagenum: this.pagenum, pagesize: this.pagesize })
      } */
  },
  filters: {},
  components: { UserTable }
}
</script>

<style lang="less" scoped>
.search {
  width: 350px;
  margin-right: 20px;
}
</style>
