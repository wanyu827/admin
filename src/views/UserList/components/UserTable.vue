<template>
  <div>
    <el-table
      :data="this.$store.getters.users"
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
              v-model="userData[scope.$index].mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="fn(scope.$index, scope.row)"
              ><i class="el-icon-edit"></i
            ></el-button>
            <el-button type="danger" size="mini"
              ><i class="el-icon-delete"></i
            ></el-button>
            <el-button type="warning" size="mini"
              ><i class="el-icon-setting"></i
            ></el-button>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'UserTable',
  created () { },
  data () {
    return {
      userData: this.$store.getters.users
    }
  },
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex % 2 !== 0) {
        return 'success-row'
      }
      return ''
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
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
