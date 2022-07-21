<template>
  <div>
    <el-table
      :data="roleList"
      style="width: 100%; margin-top: 20px"
      border
      stripe
    >
      <el-table-column type="expand" label="#">
        <template slot-scope="scope">
          <Expand :index="scope.$index"></Expand>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="#" width="50">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="角色名称" prop="roleName"> </el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            ><i class="el-icon-edit"></i> 编辑</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="sureDelRole(scope.$index, scope.row)"
            ><i class="el-icon-delete"></i> 删除</el-button
          >
          <el-button
            type="warning"
            size="mini"
            @click="handleAssign(scope.$index, scope.row)"
            ><i class="el-icon-setting"></i> 分配权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑角色对话框 -->
    <el-dialog title="编辑角色" :visible.sync="isShowEditRole">
      <el-form :model="form" :rules="rules" ref="fromRoleRef">
        <el-form-item
          label="角色名称"
          prop="roleName"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowEditRole = false">取 消</el-button>
        <el-button type="primary" @click="sureEditRole">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配权限对话框 -->
    <el-dialog title="分配权限" :visible.sync="isShowAssign" width="50%">
      <el-tree
        :data="$store.state.authority.allList"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowAssign = false">取 消</el-button>
        <el-button type="primary" @click="sureEditAuth">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Expand from './Expand.vue'
import { editSubmit, delRole, assignAuth } from '@/api/role'
export default {
  name: 'RoleList',
  created () {
    this.$store.dispatch('role/getRoleList')
    this.roleList = this.$store.state.role.roles
  },
  data () {
    return {
      roleList: [],
      isShowEditRole: false,
      isShowAssign: false,
      // 编辑角色id
      roleId: null,
      // 分配权限角色id
      assignId: null,
      form: {
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ]
      },
      formLabelWidth: '100px',
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  methods: {
    // 点击编辑按钮
    handleEdit (index, row) {
      // console.log(index, row)
      this.isShowEditRole = true
      this.form.roleName = row.roleName
      this.form.roleDesc = row.roleDesc
      this.roleId = row.id
    },
    // 点击编辑确定按钮
    async sureEditRole () {
      try {
        // 表单二次校验
        await this.$refs.fromRoleRef.validate()
        await editSubmit(this.roleId, this.form)
        this.$store.dispatch('role/getRoleList')
        this.isShowEditRole = false
      } catch (err) {
        console.log(err)
      }
    },
    // 删除角色
    sureDelRole (index, row) {
      // console.log(index, row)
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const res = await delRole(row.id)
          // console.log(res)
          if (res.data.meta.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
          }
        } catch (err) {
          console.log(err)
        }
        this.$store.dispatch('role/getRoleList')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 点击分配权限
    async handleAssign (index, row) {
      // console.log(index, row)
      this.assignId = row.id
      await this.$store.dispatch('authority/getAllList', 'tree')
      this.isShowAssign = true
      // 需要等dom更新后再设置，否则会报undefined
      this.$nextTick(function () {
        // console.log(row.children)
        // 设置角色已经拥有的权限为选中
        this.$refs.tree.setCheckedNodes(row.children)
      })
    },
    // 确定授权
    async sureEditAuth () {
      // 获取选择的节点数据（数组）
      const select = this.$refs.tree.getCheckedNodes()
      const selectId = []
      select.forEach(item => {
        selectId.push(item.id)
      })
      console.log(selectId.join(','))

      try {
        // 发送更新权限请求
        const res = await assignAuth(this.assignId, { rids: selectId.join(',') })
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message.success('更新成功')
          this.isShowAssign = false
          this.$store.dispatch('role/getRoleList')
        } else {
          this.$message.error('更新失败')
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  watch: {
    '$store.state.role.roles': {
      deep: true,
      immediate: true,
      handler (newVal) {
        this.roleList = newVal
      }
    }
  },
  components: { Expand }
}
</script>
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
