<template>
  <!-- 添加用户弹出 -->
  <el-dialog title="编辑用户" :visible="isShowEdit">
    <el-form
      :model="formAddUser"
      :rules="rules"
      label-width="80px"
      ref="editForm"
    >
      <!-- 用户名 -->
      <el-form-item label="用户名称" prop="username">
        <el-input
          type="text"
          autocomplete="off"
          disabled
          v-model="formAddUser.username"
        ></el-input>
      </el-form-item>
      <!-- 用户名 -->
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
        <el-input type="text" v-model="formAddUser.mobile"></el-input>
      </el-form-item>
      <!-- 手机号 -->
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('showEdit', false)">取 消</el-button>
      <el-button type="primary" @click.stop="handleClick">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 添加用户弹出 -->
</template>

<script>
import { editUser } from '@/api/user'
import { validMobile, validEmail } from '@/utils/validate'
export default {
  name: 'EditTable',
  props: {
    rowlist: {
      type: Object,
      required: true
    },
    isShowEdit: {
      type: Boolean,
      required: true
    }
  },
  created () { },
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
      formAddUser: this.rowlist,
      rules: {
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
    async handleClick () {
      console.log(this.rowlist)
      try {
        await this.$refs.editForm.validate()
        const res = await editUser(this.formAddUser.id, { email: this.formAddUser.email, mobile: this.formAddUser.mobile })
        console.log(res)
        this.$emit('showEdit', false)
        this.$message.success('修改成功')
      } catch (err) {
        console.log(err)
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
</style>
