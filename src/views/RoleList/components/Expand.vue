<template>
  <div class="main">
    <el-row
      :gutter="20"
      class="first"
      v-for="item in $store.state.role.roles[index].children"
      :key="item.id"
    >
      <!-- 一级 -->
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-tag>{{ item.authName }}</el-tag>
          &nbsp;<i class="el-icon-caret-right"></i></div
      ></el-col>
      <el-col :span="18"
        ><div class="grid-content bg-purple">
          <el-row v-for="item1 in item.children" :key="item1.id">
            <!-- 二级 -->
            <el-col>
              <el-row>
                <!-- 三级 -->
                <el-col :span="5"
                  ><el-tag type="success">{{ item1.authName }}</el-tag
                  >&nbsp; <i class="el-icon-caret-right"></i
                ></el-col>
                <el-col :span="19"
                  ><el-tag
                    v-for="item2 in item1.children"
                    :key="item2.id"
                    closable
                    class="three-col"
                    >{{ item2.authName }}</el-tag
                  ></el-col
                >
              </el-row>
            </el-col>
          </el-row>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  created () { },
  data () {
    return {

    }
  },
  methods: {

  },

  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.main {
  padding: 0 50px;
}
.first {
  border-top: 1px solid #eee;
  &:last-child {
    border-bottom: 1px solid #eee;
  }
  .el-row {
    &:first-child {
      border: none;
    }
    border-top: 1px solid #eee;
  }
}
.three-col {
  margin: 8px;
}
.el-row {
  display: flex;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
