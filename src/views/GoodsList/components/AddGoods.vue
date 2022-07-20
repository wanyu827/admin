<template>
  <div>
    <el-alert
      title="添加商品信息"
      type="info"
      center
      show-icon
      :closable="false"
      style="margin-bottom: 20px"
    >
    </el-alert>
    <el-form
      label-position="top"
      label-width="80px"
      :model="addGoodsForm"
      :rules="rules"
      ref="addGoodsForm"
    >
      <el-steps
        :active="parseInt(activeName) - 1"
        align-center
        finish-status="success"
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <el-tabs
        tab-position="left"
        @tab-click="onClick"
        v-model="activeName"
        :before-leave="leaveTab"
      >
        <el-tab-pane label="基本信息" name="1">
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="addGoodsForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-input
              v-model="addGoodsForm.goods_price"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight">
            <el-input
              v-model="addGoodsForm.goods_weight"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_number">
            <el-input
              v-model="addGoodsForm.goods_number"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="goods_cat">
            <el-cascader
              :options="options"
              :props="{
                expandTrigger: 'hover',
                value: 'cat_id',
                label: 'cat_name',
              }"
              v-model="addGoodsForm.goods_cat"
              @change="handleChange"
            >
              <template slot-scope="{ data }">
                <span>{{ data.cat_name }}</span>
                <!-- <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span> -->
              </template></el-cascader
            >
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="2">
          <el-form-item
            :label="item.attr_name"
            v-for="(item, index) in attrsList"
            :key="index"
          >
            <el-checkbox-group v-model="item.attr_vals">
              <el-checkbox
                :label="item1"
                v-for="(item1, index1) in selectArr[index]"
                :key="index1"
                border
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="3">
          <el-form-item
            :label="item.attr_name"
            v-for="(item, index) in onlyAttrsList"
            :key="index"
          >
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="4">
          <el-upload
            class="upload-demo"
            action="http://liufusong.top:8899/api/private/v1/upload"
            :on-success="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :on-preview="onPreview"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="5">
          <!-- 富文本编辑器 -->
          <quill-editor v-model="addGoodsForm.goods_introduce"></quill-editor>
          <el-button type="primary" @click="addGoodsBtn">添加商品</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <!-- 预览对话框 -->
    <el-dialog title="图片预览" :visible.sync="previewVisible">
      <img :src="previewUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { getCategoryList } from '@/api/categories'
import { getParamsList } from '@/api/params'
import { addGoods } from '@/api/goods'
export default {
  async created () {
    this.getCategoryList()
  },
  data () {
    return {

      id: null,
      activeName: '1',
      addGoodsForm: {
        goods_name: '',
        goods_cat: '',
        goods_price: '0',
        goods_number: '0',
        goods_weight: '0',
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在2-8个字符', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请选择必要的商品分类' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ]
      },
      value: [],
      options: [],
      attrsList: [],
      selectArr: [],
      onlyAttrsList: [],
      fileList: [],
      previewUrl: '',
      previewVisible: false
    }
  },

  methods: {
    // 级联选择器选择变化触发
    handleChange (value) {
      console.log(this.addGoodsForm.goods_cat.length)
      if (this.addGoodsForm.goods_cat.length !== 3) {
        this.addGoodsForm.goods_cat = []
        return false
      } else {
        console.log(value[value.length - 1])
        this.addGoodsForm.goods_cat = value.join(',')
        this.id = value[value.length - 1]
      }
    },
    // 获取商品分类数据列表
    async getCategoryList () {
      try {
        const res = await getCategoryList()
        console.log(res.data.data)
        this.options = res.data.data
      } catch (err) {
        console.log('err', err)
      }
    },
    leaveTab (activeName, oldActiveName) {
      if (oldActiveName === 'first') {
        if (!this.id) {
          this.$message.error('请选择商品分类')
          return false
        }
      }
    },
    // 点击侧边标签页
    async onClick (tab) {
      if (!this.id) {
        return false
      } else {
        if (tab.index === '1') {
          try {
            const res = await getParamsList(this.id, { sel: 'many' })
            console.log(res)
            res.data.data.forEach(item => {
              item.attr_vals = item.attr_vals.length !== 0 ? item.attr_vals.split(' ') : []
            })
            res.data.data.forEach(item => {
              this.selectArr.push(item.attr_vals)
            })
            this.attrsList = res.data.data
            // console.log(this.attrsList)
          } catch (err) {
            console.log(err)
          }
        } else if (tab.index === '2') {
          try {
            const res = await getParamsList(this.id, { sel: 'only' })
            console.log(res)
            this.onlyAttrsList = res.data.data
          } catch (err) {
            console.log(err)
          }
        }
      }
    },

    handleRemove (file, fileList) {
      console.log(file, fileList)
      this.addGoodsForm.pics.forEach((item, index) => {
        if (item === file.url) {
          this.addGoodsForm.pics.splice(index, 1)
        }
      })
    },
    handlePreview (file, fileList) {
      console.log(file, fileList.url)
      this.addGoodsForm.pics.push(fileList.url)
    },
    async addGoodsBtn () {
      console.log(this.addGoodsForm)
      this.attrsList.forEach(item => {
        const obj = { attr_id: item.attr_id, attr_value: item.attr_vals }
        this.addGoodsForm.attrs.push(obj)
      })
      this.onlyAttrsList.forEach(item => {
        const obj = { attr_id: item.attr_id, attr_value: item.attr_vals }
        this.addGoodsForm.attrs.push(obj)
      })
      console.log(this.addGoodsForm)
      // 表单二次校验
      try {
        await this.$refs.addGoodsForm.validate()
        await addGoods(this.addGoodsForm)
        // console.log(res)
        this.activeName = '7'
        this.$router.push('/home/goods')
        this.$store.commit('nav/setNav', ['商品管理', '商品列表'])
        this.$message.success('创建成功')
      } catch (err) {
        console.log(err)
        this.$message.error('创建失败')
      }
    },
    // 预览
    onPreview (file) {
      console.log(file)
      this.previewUrl = file.url
      this.previewVisible = true
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
:deep(.el-step__title) {
  font-size: 13px;
  margin-bottom: 20px;
}
:deep(.ql-container) {
  min-height: 300px;
  margin-bottom: 20px;
}
</style>
