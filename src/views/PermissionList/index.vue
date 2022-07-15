<template>
  <el-table :data="list" stripe style="width: 100%" class="main">
    <el-table-column prop="id" label="#" width="180">
      <template slot-scope="scope">
        {{ scope.$index + 1 }}
      </template>
    </el-table-column>
    <el-table-column prop="authName" label="权限名称" width="180">
    </el-table-column>
    <el-table-column prop="path" label="路径"> </el-table-column>
    <el-table-column prop="level" label="权限等级">
      <template slot-scope="scope">
        <el-tag
          :type="
            scope.row.level === '0'
              ? ''
              : scope.row.level === '1'
              ? 'success'
              : 'warning'
          "
          >{{
            scope.row.level === "0"
              ? "等级一"
              : scope.row.level === "1"
              ? "等级二"
              : "等级三"
          }}</el-tag
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'PermissionList',
  async created () {
    await this.$store.dispatch('authority/getAllList', 'list')
    this.list = this.$store.state.authority.allList
  },
  data () {
    return {
      list: []
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
