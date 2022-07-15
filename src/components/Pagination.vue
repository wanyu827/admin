<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="$store.state.user.pagesize"
      :current-page="$store.state.user.pagenum"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.$store.getters.total || 0"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  created () {

  },
  data () {
    return {

    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.$store.state.user.pagesize = val
      this.$store.dispatch('user/getUserInfoList', { pagenum: this.$store.state.user.pagenum, pagesize: this.$store.state.user.pagesize })
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.$store.state.user.pagenum = val
      this.$store.dispatch('user/getUserInfoList', { pagenum: this.$store.state.user.pagenum, pagesize: this.$store.state.user.pagesize })
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.block {
  margin-top: 20px;
}
</style>
