<template>
  <div class="main">
    <el-input
      placeholder="请输入内容"
      v-model="goodsName"
      clearable
      class="search"
    >
      <template #append>
        <el-button @click="searchGood"
          ><i class="el-icon-search"></i
        ></el-button>
      </template>
    </el-input>
    <!-- 添加商品按钮 -->
    <el-button type="primary" @click="addGoods">添加商品</el-button>
    <!-- 商品表格 -->
    <el-table
      :data="$store.state.goods.goods"
      stripe
      style="width: 100%; margin-top: 20px"
      border
    >
      <el-table-column label="#" width="50px">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="600">
      </el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)" width="100">
      </el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="100">
      </el-table-column>
      <el-table-column label="创建时间" width="100">
        <template slot-scope="scope">
          <!-- 格式化时间 -->
          {{ scope.row.add_time | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200">
        <template v-slot="scope">
          <el-button type="primary" size="mini" @click="editGoods(scope.row)"
            ><i class="el-icon-edit"></i> <span>编辑</span></el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="delGoods(scope.row.goods_id)"
            ><i class="el-icon-delete"></i> <span>删除</span></el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      :page-sizes="[1, 5, 10, 15]"
      :page-size="$store.state.goods.pagesize"
      :current-page="$store.state.goods.pagenum"
      :total="$store.state.goods.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></Pagination>
  </div>
</template>

<script>
import { delGoods } from '@/api/goods'
export default {
  name: 'GoodsList',
  async created () {
    this.getGoodsList()
  },

  data () {
    return {
      goodsName: ''
    }
  },
  methods: {
    // 设置每页显示条数
    handleSizeChange (val) {
      this.$store.state.goods.pagesize = val
      this.getGoodsList()
    },
    // 点击页码跳转
    handleCurrentChange (val) {
      this.$store.state.goods.pagenum = val
      this.getGoodsList()
    },
    // 获取商品列表
    async getGoodsList () {
      this.$store.dispatch('goods/getGoodsList', { query: this.goodsName, pagenum: this.$store.state.goods.pagenum, pagesize: this.$store.state.goods.pagesize })
    },
    // 搜索
    searchGood () {
      this.$store.dispatch('goods/getGoodsList', { query: this.goodsName, pagenum: this.$store.state.goods.pagenum, pagesize: this.$store.state.goods.pagesize })
    },
    // 点击添加商品
    addGoods () {
      this.$store.commit('nav/setNav', ['商品管理', '添加商品'])
      this.$router.push('/home/goods/add')
    },
    // 编辑
    editGoods (row) {
      this.$store.commit('nav/setNav', ['商品管理', '编辑商品'])
      console.log(row.goods_id)
      this.$store.commit('goods/setGoodsId', row.goods_id)
      this.$router.push('/home/goods/edit')
    },
    // 删除
    delGoods (id) {
      console.log(id)
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await delGoods(id)
          this.getGoodsList()
          this.$message.success('删除成功')
        } catch (err) {
          console.log(err)
          this.$message.error('删除失败')
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  computed: {},
  watch: {},
  filters: {

  },
  components: {}
}
</script>

<style scoped lang='less'>
.search {
  width: 350px;
  margin-right: 20px;
}
</style>
