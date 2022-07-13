<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage1"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.$store.getters.total"
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
      currentPage1: 1,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.$emit('get-pagesize', val)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.$emit('get-pagenum', val)
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
