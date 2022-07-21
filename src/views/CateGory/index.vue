<template>
  <div>
    <el-button type="primary" style="margin-bottom: 15px" @click="addClick"
      >添加分类</el-button
    >
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="cat_id"
      border
      :tree-props="{
        children: 'children',
        hasChildren: 'hasChildren',
      }"
    >
      <el-table-column label="#" type="" width="50px" prop="index">
      </el-table-column>
      <el-table-column prop="cat_name" label="分类名称" width="180">
      </el-table-column>
      <el-table-column prop="cat_deleted" label="是否有效" width="180">
        <template slot-scope="scope">
          <i
            :style="{
              color: scope.row.cat_deleted === false ? 'green' : 'red',
            }"
            :class="
              scope.row.cat_deleted === false
                ? 'el-icon-success'
                : 'el-icon-error'
            "
          ></i>
        </template>
      </el-table-column>
      <el-table-column prop="cat_level" label="排序">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level === 1"
            >二级</el-tag
          >
          <el-tag type="warning" v-else>三级</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            type="primary"
            class="el-icon-edit"
            size="mini"
            @click="editClick(scope.row.cat_id)"
          >
            编辑</el-button
          >
          <el-button
            type="danger"
            class="el-icon-delete"
            size="mini"
            @click="delCategory(scope.row.cat_id)"
          >
            删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :page-sizes="[1, 2, 4, 6, 10]"
      :page-size="pagesize"
      :current-page="pagenum"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></Pagination>
    <!-- 添加对话框 -->
    <el-dialog
      :title="isEdit ? '编辑商品分类' : '添加商品分类'"
      :visible.sync="dialogShow"
    >
      <el-form
        label-width="100px"
        :model="addCategoryForm"
        :rules="rules"
        ref="addCategoryRef"
      >
        <el-form-item label="分类名称:" prop="cat_name">
          <el-input v-model="addCategoryForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类:">
          <div class="block">
            <el-cascader
              v-model="value"
              @change="handleChange"
              :props="{
                expandTrigger: 'hover',
                value: 'cat_id',
                label: 'cat_name',
                checkStrictly: true,
              }"
              :options="options"
            ></el-cascader>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogShow = false">取消</el-button>
        <el-button type="primary" @click="onClick">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getCategoryList, addCategory, getCategoryById, editSubmitCategory, delCategory } from '@/api/categories'
import Pagination from '@/components/Pagination.vue'

export default {
  async created () {
    this.getCategoryList()
  },
  data () {
    return {
      value: '',
      index: 1,
      pagenum: 1,
      pagesize: 4,
      total: 0,
      tableData: [],
      isEdit: false,
      dialogShow: false,
      options: [],
      addCategoryForm: {
        cat_pid: 0,
        cat_name: '',
        cat_level: 0
      },
      rules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在2到8个字符', trigger: 'blur' }
        ]
      },
      editId: ''

    }
  },
  methods: {
    // 获取分类
    async getCategoryList () {
      const res = await getCategoryList({ pagenum: this.pagenum, pagesize: this.pagesize })
      this.tableData = res.data.data.result
      this.tableData.forEach((item, index) => {
        item.index = index + 1
      })
      this.total = res.data.data.total
      // console.log(res)
    },
    // 改变pagesize
    handleSizeChange (val) {
      console.log('size', val)
      this.pagesize = val
      this.getCategoryList()
    },
    // 改变pagenum
    handleCurrentChange (val) {
      console.log(val)
      this.pagenum = val
      this.getCategoryList()
    },
    // 点击添加
    async addClick () {
      this.isEdit = false
      try {
        this.addCategoryForm.cat_name = ''
        this.value = ''
        const res = await getCategoryList({ type: 2 })
        this.options = res.data.data
      } catch (err) {
        console.log(err)
      }
      this.dialogShow = true
    },
    // 级联选择
    handleChange (val) {
      this.addCategoryForm.cat_pid = val[val.length - 1]
      this.addCategoryForm.cat_level = val.length
    },
    // 确定添加
    async onClick () {
      try {
        await this.$refs.addCategoryRef.validate()
        if (this.isEdit) {
          await editSubmitCategory(this.editId, { cat_name: this.addCategoryForm.cat_name })
          this.$message.success('修改成功')
        } else {
          await addCategory(this.addCategoryForm)
          this.$message.success('创建成功')
        }
        await this.$refs.addCategoryRef.resetFields()
        this.value = ''
        this.dialogShow = false
        this.getCategoryList()
      } catch (err) {
        console.log(err)
        this.$message.error('创建失败')
      }
    },
    // 点击编辑
    async editClick (id) {
      try {
        this.isEdit = true
        this.editId = id
        const res = await getCategoryById(id)
        const res1 = await getCategoryList({ type: 2 })

        this.options = res1.data.data
        if (res.data.data.cat_pid === 0) {
          this.value = [res.data.data.cat_id]
        } else {
          this.value = [res.data.data.cat_pid, res.data.data.cat_id]
        }
        this.addCategoryForm = res.data.data
        this.dialogShow = true
      } catch (err) {
        console.log(err)
      }
    },
    // 删除分类
    delCategory (id) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await delCategory(id)
          this.getCategoryList()
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
  computed: {

  },
  watch: {},
  filters: {},
  components: { Pagination }
}
</script>

<style scoped lang='less'>
</style>
