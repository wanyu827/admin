<template>
  <div>
    <el-button
      size="mini"
      type="primary"
      style="margin-bottom: 10px"
      :disabled="isSelected"
      @click="addParams"
      >{{ sel === "many" ? "添加参数" : "添加属性" }}</el-button
    >

    <el-table
      :data="paramsList"
      style="width: 100%"
      border
      @expand-change="handleExpand"
    >
      <el-table-column type="expand">
        <!-- 标签 -->
        <template slot-scope="scope">
          <el-tag
            closable
            @close="handleClose(scope.$index, index)"
            v-for="(item, index) in attr_vals[scope.$index]"
            :key="index"
            v-show="item.length > 0"
            >{{ item }}
          </el-tag>

          <el-input
            v-if="scope.$index === index"
            class="input-new-tag"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(scope)"
            @blur="handleInputConfirm(scope)"
          >
          </el-input>
          <el-button
            class="button-new-tag"
            v-else
            size="small"
            @click="showInput(scope)"
            >+ New Tag</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="#" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="attr_name"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="clickEditBtn(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="delParams(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加参数 -->
    <el-dialog
      :title="sel === 'many' ? '添加动态参数' : '添加静态参数'"
      :visible.sync="addParamsShow"
    >
      <el-form
        label-width="80px"
        ref="addParamsFormRef"
        :model="addParamsForm"
        :rules="rules"
      >
        <el-form-item
          :label="sel === 'many' ? '动态参数' : '静态属性'"
          prop="attr_name"
        >
          <el-input v-model="addParamsForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addParamsShow = false">取消</el-button>
        <el-button type="primary" @click="onClick">确定</el-button>
      </template>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      :title="sel === 'many' ? '修改动态参数' : '修改静态参数'"
      :visible.sync="editParamsShow"
    >
      <el-form
        label-width="80px"
        ref="addParamsFormRef"
        :model="addParamsForm"
        :rules="rules"
      >
        <el-form-item
          :label="sel === 'many' ? '动态参数' : '静态属性'"
          prop="attr_name"
        >
          <el-input v-model="addParamsForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editParamsShow = false">取消</el-button>
        <el-button type="primary" @click="onEditClick">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { editSubmitParams, addParams, delParams } from '@/api/params'
export default {
  props: {
    sel: {
      type: String,
      required: true
    },
    isSelected: {
      type: Boolean,
      required: true
    },
    paramsList: {
      type: Array
    }
  },
  async created () {

  },
  data () {
    return {
      editParamsShow: false,
      addParamsShow: false,
      inputVisible: false,
      inputValue: '',
      attr_vals: [],
      attr_id: null,
      cat_id: null,
      paramsData: {
        attr_id: '',
        cat_id: '',
        attr_name: '',
        attr_sel: '',
        attr_vals: ''
      },
      addParamsForm: {
        cat_id: '',
        attr_name: '',
        attr_sel: '',
        attr_vals: ''
      },
      rules: {
        attr_name: [
          {
            required: true, message: '请输入参数名称', triggr: 'blur'
          },
          { min: 2, max: 7, message: '长度在2到7个字符', triggr: 'blur' }
        ]
      },
      index: null

    }
  },
  methods: {
    handleClose (tag, index) {
      // console.log(tag, index)
      this.attr_vals[tag].splice(index, 1)
      this.paramsData.attr_vals = this.attr_vals[tag].join(' ')
      this.editSubmitParams()
    },

    showInput (row) {
      // console.log(row)
      this.index = row.$index
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 添加标签
    handleInputConfirm (row) {
      this.inputVisible = false
      // console.log(row)
      this.index = null
      if (this.inputValue) {
        // console.log('111', this.attr_vals, row.$index)
        this.attr_vals[row.$index].push(this.inputValue)
        this.paramsData.attr_vals = this.attr_vals[row.$index].join(' ')
        this.editSubmitParams()
      }

      this.inputValue = ''
    },

    async editSubmitParams () {
      try {
        await editSubmitParams(this.paramsData)
        // console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    // 展开
    handleExpand (row) {
      // console.log(row, a)
      this.paramsData = row
    },
    // 添加参数
    addParams () {
      this.addParamsShow = true
      // console.log(this.paramsList)

      this.addParamsForm.attr_sel = this.sel
      // console.log(this.addParamsForm)
    },
    // 确认添加
    async onClick () {
      // console.log(this.addParamsForm)
      try {
        await this.$refs.addParamsFormRef.validate()
        await addParams(this.addParamsForm)
        this.$emit('get-list')
        this.addParamsForm.attr_name = ''
        this.$refs.addParamsFormRef.resetFields()
        this.addParamsShow = false
      } catch (err) {
        console.log(err)
      }
    },
    // 确认修改
    async onEditClick () {
      console.log(this.addParamsForm)
      try {
        await editSubmitParams(this.addParamsForm)
        // console.log(res)
        this.editParamsShow = false
      } catch (err) {
        console.log(err)
      }
    },
    // 点击修改
    clickEditBtn (row) {
      // console.log(scope)
      this.addParamsForm = row
      this.editParamsShow = true
    },
    // 删除参数
    async delParams (row) {
      this.$confirm('此操作将永久删除该属性, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await delParams(row)
          this.$emit('get-list')
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
      // console.log(row)
    }
  },
  computed: {},
  watch: {
    paramsList (val) {
      this.attr_vals = []
      val.forEach(item => {
        this.attr_vals.push(item.attr_vals.split(' '))
      })
      // console.log('11', val[0].cat_id)

      if (val.length !== 0) {
        this.addParamsForm.cat_id = val[0].cat_id
      }
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
:deep(.el-table__expanded-cell) {
  padding: 15px 50px;
}
.el-tag {
  margin-right: 10px;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
