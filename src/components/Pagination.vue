<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :current-page="currentPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total || 0"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    pageSizes: {
      type: Array,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
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
      this.$emit('size-change', val)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.$emit('current-change', val)
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
