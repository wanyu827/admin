<template>
  <div>
    <el-button type="primary" @click="addRole">添加角色</el-button>
    <RoleList></RoleList>

    <el-dialog title="添加角色" :visible.sync="isShowAddRole">
      <el-form :model="form" :rules="rules">
        <el-form-item
          label="角色名称"
          prop="name"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="form.desc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowAddRole = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import RoleList from './components/RoleList.vue'
// import {addRole} from '@/api/role'
export default {
  name: 'Role',
  created () { },
  data () {
    return {
      isShowAddRole: false,

      form: {
        name: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ]
      },
      formLabelWidth: '100px'
    }
  },
  methods: {
    async addRole () {
      this.isShowAddRole = true
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { RoleList }
}
</script>

<style scoped lang='scss'>
</style>
