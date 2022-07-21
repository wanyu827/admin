<template>
  <div>
    <!-- 搜索框 -->
    <el-input
      placeholder="请输入内容"
      style="width: 400px; margin-bottom: 20px"
      v-model="paramsObj.query"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="getOrdersList"
      ></el-button
    ></el-input>
    <!-- 订单列表 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="200">
      </el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="180">
      </el-table-column>
      <el-table-column prop="order_pay" label="是否付款">
        <template slot-scope="scope">
          <el-tag
            type="success"
            effect="dark"
            v-if="
              tableData[scope.$index] &&
              tableData[scope.$index].order_pay === '1'
            "
            >支付宝</el-tag
          >
          <el-tag
            type="success"
            effect="dark"
            v-else-if="
              tableData[scope.$index] &&
              tableData[scope.$index].order_pay === '2'
            "
            >微信</el-tag
          >
          <el-tag
            type="success"
            effect="dark"
            v-else-if="
              tableData[scope.$index] &&
              tableData[scope.$index].order_pay === '3'
            "
            >银行卡</el-tag
          >
          <el-tag type="danger" effect="dark" v-else>未支付</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货"> </el-table-column>
      <el-table-column prop="create_time" label="下单时间"> </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button
            type="primary"
            class="el-icon-edit"
            size="mini"
            @click="showAddress = true"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :page-sizes="[1, 2, 5, 10]"
      :page-size="paramsObj.pagesize"
      :current-page="paramsObj.pagenum"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></Pagination>
    <el-dialog title="修改收货地址" :visible.sync="showAddress">
      <el-cascader
        :options="cityOptions"
        :value="city"
        @change="changeProvince"
      >
      </el-cascader>
      <template #footer>
        <el-button @click="showAddress = false">取消</el-button>
        <el-button type="primary" @click="showAddress = false">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import cityOptions from '@/utils/city_data2017_element'
import { getOrdersList } from '@/api/order'
export default {
  created () {
    this.getOrdersList()
  },
  data () {
    return {
      cityOptions: cityOptions,
      showAddress: false,
      total: 0,
      tableData: [],
      paramsObj: {
        query: '',
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  methods: {
    // 获取订单列表
    async getOrdersList () {
      try {
        const res = await getOrdersList(this.paramsObj)
        this.tableData = res.data.data.goods
        this.total = res.data.data.total
        // console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    handleSizeChange (val) {
      // console.log(val)
      this.paramsObj.pagesize = val
      this.getOrdersList(this.paramsObj)
    },
    handleCurrentChange (val) {
      // console.log(val)
      this.paramsObj.pagenum = val
      this.getOrdersList(this.paramsObj)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='scss'>
</style>
