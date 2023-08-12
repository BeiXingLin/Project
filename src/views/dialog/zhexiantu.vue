<template>
  <div>
    <div ref="chart" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts' 

export default {
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      // 后端数据
      const backendData = {
        labels: ['堆垛机1', '堆垛机2', '堆垛机3', '堆垛机4', '堆垛机5', '堆垛机6'],
        values: [10, 20, 30, 25, 35, 28]
      };

      // 创建Echarts实例
      const chart = echarts.init(this.$refs.chart);

      // 配置图表
      const option = {
        xAxis: {
          type: 'category',
          data: backendData.labels
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          type: 'line',
          data: backendData.values
        }]
      };

      // 渲染图表
      chart.setOption(option);
    }
  }
}
</script>