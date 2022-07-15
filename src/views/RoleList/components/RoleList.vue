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
            @click="handleDelete(scope.$index, scope.row)"
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
  </div>
</template>

<script>
import Expand from './Expand.vue'
export default {
  name: 'RoleList',
  created () {
    this.$store.dispatch('role/getRoleList')
    this.roleList = this.$store.state.role.roles
  },
  data () {
    return {
      roleList: []

    }
  },
  methods: {

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
