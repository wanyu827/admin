<template>
  <div class="login-container">
    <div class="form-box">
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input
            v-model.trim="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model.trim="loginForm.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn-item">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'Login',
  created () {

  },
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '用户名在3到8位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '密码在3到8位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    reset () {
      this.$refs.loginFormRef.resetFields()
    },
    async login () {
      try {
        await this.$refs.loginFormRef.validate()
        try {
          const res = await login(this.loginForm)
          console.log(res)
          // todo token存入vuex 写进localStorerage

          if (res.data.meta.status === 200) {
            this.$store.commit('user/setUser', res.data.data.token)
            this.$router.push('/home')
            this.$message.success('登录成功')
          } else {
            this.$message.error('用户名或密码有误')
          }
        } catch (err) {
          console.log(err)
        }
      } catch (err) {
        this.$message.error('用户名或密码有误')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.login-container {
  width: 100vw;
  height: 100vh;
  background: url("@/assets/bg.png") no-repeat 0 0 / cover;
  display: flex;
  align-items: center;
  justify-content: center;
  .form-box {
    width: 420px;
    height: 240px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 40px 15px 0;
    box-sizing: border-box;
    .btn-item {
      text-align: right;
    }
  }
}
</style>
