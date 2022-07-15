<template>
  <div>
    <el-table
      :data="$store.getters.users"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      border
    >
      <template>
        <el-table-column prop="id" label="#" width="50">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="180">
        </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="$store.getters.users[scope.$index].mg_state"
              active-color="#13ce66"
              inactive-color="#ccc"
              @change="handleChange($event, scope.$index)"
            >
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              ><i class="el-icon-edit"></i
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
              ><i class="el-icon-delete"></i
            ></el-button>
            <el-button
              type="warning"
              size="mini"
              @click="handleAssign(scope.$index, scope.row)"
              ><i class="el-icon-setting"></i
            ></el-button>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <EditTable
      :isShowEdit="isShowEdit"
      :rowlist="rowList"
      @showEdit="isShowEdit = $event"
      v-if="isShowEdit"
    ></EditTable>
    <el-dialog title="分配角色" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="当前的用户:" :label-width="formLabelWidth">
          <span>{{ username }}</span>
        </el-form-item>
        <el-form-item label="当前的角色:" :label-width="formLabelWidth">
          <span>{{ roleName }}</span>
        </el-form-item>
        <el-form-item label="分配新角色" :label-width="formLabelWidth">
          <el-select v-model="roleId" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="assignUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { delUserTable } from '@/api/user'
import { assignUser } from '@/api/role'
import EditTable from './EditTable.vue'
export default {
  name: 'UserTable',
  created () {

  },
  data () {
    return {
      // userData: this.$store.getters.users
      rowList: {},
      isShowEdit: false,
      dialogFormVisible: false,
      roleId: '',
      username: '',
      userId: '',
      roleName: '',
      formLabelWidth: '120px',
      roleList: this.$store.state.role.roles || []
    }
  },
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex % 2 !== 0) {
        return 'success-row'
      }
      return ''
    },
    // 编辑用户
    handleEdit (index, row) {
      console.log(index, row)
      this.isShowEdit = true
      this.rowList = row
    },
    // 分配角色
    handleAssign (index, row) {
      console.log(index, row)
      this.username = row.username
      this.roleName = row.role_name
      this.userId = row.id
      this.dialogFormVisible = true
      this.$store.dispatch('role/getRoleList')
      this.roleList = this.$store.state.role.roles
    },
    // 分配角色确认
    async assignUser () {
      try {
        const res = await assignUser(this.userId, { rid: this.roleId })
        console.log(res)
        if (res.data.meta.status === 400) {
          this.$message.error(res.data.meta.msg)
        } else {
          this.$message.success(res.data.meta.msg)
          this.dialogFormVisible = false
        }
      } catch (err) {
        console.log('err', err)
      }
    },
    // 删除确认框
    async handleDelete (index, row) {
      console.log(index, row)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: 'ok',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(async () => {
        const res = await delUserTable(row.id)
        if (res.data.meta.status === 400) {
          this.$message.error('删除失败')
          return
        }
        this.$store.dispatch('user/getUserInfoList', { pagenum: this.$store.state.user.pagenum, pagesize: this.$store.state.user.pagesize })
        console.log(res)

        this.$message({

          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 修改用户状态
    handleChange (type, index) {
      const uid = this.$store.getters.users[index].id
      console.log(type)
      this.$store.dispatch('user/editUserType', { uid, type })
    }
  },
  computed: {},
  watch: {

  },
  filters: {},
  components: { EditTable }
}
</script>

<style  lang='less'>
.el-table .warning-row {
  background: pink;
}

.el-table .success-row {
  background: #f0f9eb;
}
.el-table {
  margin-top: 20px;
}
</style>
