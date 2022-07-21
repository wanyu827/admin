<template>
  <div>
    <!-- 警告 -->
    <el-alert
      title="注意：只允许为第三级分类设置相关参数！"
      type="warning"
      :closable="false"
      show-icon
    >
    </el-alert>
    <!-- 级联选择器 -->
    <div class="block">
      <span class="demonstration">选择商品分类: </span>
      <el-cascader
        :options="options"
        @change="handleChange"
        :props="{ expandTrigger: 'hover', value: 'cat_id', label: 'cat_name' }"
      ></el-cascader>
    </div>
    <!-- tabs标签页 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="many"
        ><TagsList
          :sel="activeName"
          :isSelected="isSelect"
          :paramsList="paramsList"
          @get-list="getParamsList"
        ></TagsList
      ></el-tab-pane>
      <el-tab-pane label="静态属性" name="only"
        ><TagsList
          :sel="activeName"
          :isSelected="isSelect"
          :paramsList="paramsList"
          @get-list="getParamsList"
        ></TagsList
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TagsList from './components/TagsList.vue'
import { getCategoryList } from '@/api/categories'
import { getParamsList } from '@/api/params'
export default {
  created () {
    this.getCategoryList()
  },
  data () {
    return {
      options: [],
      activeName: 'many',
      isSelect: true,
      paramsList: [],
      // 分类id
      id: null
    }
  },
  methods: {
    // 获取商品分类数据列表
    async getCategoryList () {
      try {
        const res = await getCategoryList()
        // console.log(res.data.data)
        this.options = res.data.data
      } catch (err) {
        console.log('err', err)
      }
    },
    // 级联选择器选择变化触发
    async handleChange (value) {
      if (value.length !== 3) {
        this.$message.error('请选择三级分类')
        this.value = []
        return false
      }
      this.id = value[value.length - 1]
      this.getParamsList()
      this.isSelect = false
      // console.log(value)
    },
    handleClick () {

    },
    async getParamsList () {
      try {
        const res = await getParamsList(this.id, { sel: this.activeName })
        // console.log(res)
        this.paramsList = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {
    activeName (val) {
      if (this.isSelect === false) {
        this.getParamsList()
      }
    }
  },
  filters: {},
  components: { TagsList }
}
</script>

<style scoped lang='less'>
.block {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
