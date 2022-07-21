<template>
  <div style="width: auto; height: 550px" id="main"></div>
</template>

<script>
import { getReports } from '@/api/report'
// 通过this.$echarts来使用
export default {
  name: 'Report',
  async created () {
    const res = await getReports()
    console.log(res)
    this.dataList = res.data.data
  },
  async mounted () {
    // 在通过mounted调用即可
    this.echartsInit()
  },
  data () {
    return {
      dataList: {}
    }
  },
  methods: {
    // 初始化echarts
    async echartsInit () {
      // 柱形图
      // 因为初始化echarts 的时候，需要指定的容器 id='main'

    }

  },
  watch: {
    dataList: {
      deep: true,

      handler (val) {
        console.log(val)
        this.$echarts.init(document.getElementById('main')).setOption({
          title: {
            text: '用户来源'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#E9EEF3'
              }
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: val.xAxis[0].data
          },
          yAxis: {
            type: 'value'
          },
          series: val.series,
          legend: val.legend
        })
      }
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
