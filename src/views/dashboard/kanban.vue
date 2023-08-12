<template>
  <div class="dashboard">
        <div class="company-info">
          {{$t('dashboard.company')}}
        </div>
        <br/>
        <br/>
        <br/>
      <div id="app1">
        <div class="title-info">
          堆垛机监控
        </div>
        <div id="showExample" style="display: flex; justify-content: space-between;width:800px ">
                <div style="display: flex; align-items: center;">
                    堆垛机当前位置&nbsp;&nbsp;<el-tag style="background-color:orange" class="publbut" ></el-tag>
                </div>
                <div  style="display: flex; align-items: center;">
                    库位&nbsp;&nbsp;<el-tag style="background-color:white;" class="publbut" ></el-tag>
                </div>
                <div  style="display: flex; align-items: center;">
                    堆垛机上无物料&nbsp;&nbsp;<el-tag style="background-color:white" class="publbut" text></el-tag>
                </div>
                <div  style="display: flex; align-items: center;">
                    堆垛机上有物料&nbsp;&nbsp;<el-tag style="background-color:yellow" class="publbut" text></el-tag>
                </div>
        </div>
        <div  id="position" >
          <div id="CRN1">
            <el-tag size="large"  style="background-color:#ebf1f6;;" id="label1">1号堆垛机</el-tag>
            <div >
                <el-tag v-for="i in 49" :key="i"  style="background-color:white;" size="small">
                    {{i}}
                </el-tag>
                <br/>
                <br/>
                <el-tag v-for="i in 49" :key="i" style="background-color:white;" size="small">
                    {{i}}
                </el-tag>
            </div>
          </div>
          <div  id="CRN2">
            <el-tag size="large" style="background-color:#ebf1f6;;" id="label2">2号堆垛机</el-tag>
            <div >
                <el-tag v-for="i in 49" :key="i"  style="background-color:white;" size="small">
                    {{i}}
                </el-tag>
                <br/>
                <br/>
                <el-tag v-for="i in 49" :key="i" style="background-color:white;" size="small">
                    {{i}}
                </el-tag>
            </div>
          </div>
        </div>
      </div>
      <div id="app2">
        <div class="title-info2">
          任务汇总
        </div>
        <div ref="pieChart" style=" width: 50%; height: 300px;display: inline-block;" ></div>
        <div ref="barChart" style=" width: 50%; height: 300px;display: inline-block;" ></div>
      </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import { mapGetters } from 'vuex'
import pageTools from './components/page-top.vue'
import {GetStationList} from '@/api/station'
import * as echarts from 'echarts' 
export default {
  components: {
    CountTo,
    pageTools
  },
  data() {
    return {
      chart: null,
      chartData: {
        // 这里是你要绘制的饼图数据
          }
      }
  },
  computed: {

  },
  watch: {
    
  },
  destroyed(){
    // this.clear();
  },

  created() {
    // this.dataRefreh();
  },
  mounted() {
    this.renderPieChart();
    this.renderBarChart();

  },
  methods: {
    renderPieChart() {
      const pieChart = echarts.init(this.$refs.pieChart);

      // 饼状图的配置
      const pieOption = {
        title: {
          text: '任务统计',
          left: '25%', // 设置标题的位置为容器的中间
        },
        grid:{
          left: '10%', // 调整图表在容器中的横向位置为右侧
        },
        tooltip: {
          trigger: 'item', // 设置触发类型为数据项触发
          formatter: '{a} <br/>{b}: {c} ({d}%)' // 设置tooltip的显示格式
        },
        legend: {
          orient: 'vertical',
          left: 390,
          data: ['CRN1', 'CRN2']
        },
        series: [
          {
            name: '详情',
            type: 'pie',
            radius: '50%',
            center: ['30%', '45%'],
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: false,
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 335, name: 'CRN1'},
              {value: 310, name: 'CRN2'},
            ]
          }
        ]
      };
      pieChart.setOption(pieOption);
    },
    renderBarChart() {
      const barChart = echarts.init(this.$refs.barChart);
      const barOption = {
        title: {
            text: '任务详情'
              },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: "shadow",
            },
          },
          grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        yAxis: {
            type: "category",
            data: ['CRN1', 'CRN2'],
            splitLine: { show: false },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          offset: 10,
          nameTextStyle: {
            fontSize: 10,
          },
          },
        xAxis: {
            type: 'value',
            axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: { show: false },
          axisLabel: { show: false },
            },
        series: [
            {
              name: 'CRN1',
              type: 'bar',
              data: [100],
              barWidth: 14,
              barGap: 10,
              smooth: true,
              label: {
                normal: {
                  show: true,
                  position: "right",
                  offset: [5, -2],
                  textStyle: {
                    color: "#333",
                    fontSize: 13,
                  },
                },
              },
              itemStyle: {
                emphasis: {
                  barBorderRadius: 7,
                },
                normal: {
                  barBorderRadius: 7,
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: "#3977E6" },
                    { offset: 1, color: "#37BBF8" },
                  ]),
                },
              },
            },
            {
              name: 'CRN2',
              type: 'bar',
              data: [200],
              barWidth: 14,
              barGap: 10,
              smooth: true,
              label: {
                normal: {
                  show: true,
                  position: "right",
                  offset: [5, -2],
                  textStyle: {
                    color: "#333",
                    fontSize: 13,
                  },
                },
              },
              itemStyle: {
                emphasis: {
                  barBorderRadius: 7,
                },
                normal: {
                  barBorderRadius: 7,
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: "#3977E6" },
                    { offset: 1, color: "#37BBF8" },
                  ]),
                },
              },
            }
            ]
      };
      barChart.setOption(barOption);
    },
    choosecolor(i) {
      let style = {};
      style.backgroundColor = "purple"
      return style
    },
    async GetStationList() {
        const Data = await GetStationList()
        console.log('进入定时器绑定事件')
      },
    // 定时刷新数据函数
    dataRefreh() {
      // 计时器正在进行中，退出函数
      if (this.intervalId != null) {
        return;
      }
      // 计时器为空，操作
      this.intervalId = setInterval(() => {
        console.log("刷新" + new Date());
        this.GetStationList(); //加载数据函数
      }, 5000);
    }, 
    // 停止定时器
    clear() {
      clearInterval(this.intervalId); //清除计时器
      this.intervalId = null; //设置为null
    },
    getOption() {
      
    }

  }
}
</script>
<style scoped lang="scss">
    .dashboard {
          background:#ebf1f6;
        .company-info {
          font-family: sans-serif;
          font-size: 30px;
          font-weight: bold;
          font-style: italic;
          letter-spacing: 2px;
          line-height: 1.5;
          margin-left: 10px;
          margin-top: 10px;
          }
        #app1{
          .title-info{
            font-size: 20px;
            font-weight: bold;
            font-style: italic;
            margin-left: 10px;
          }
          #showExample{
            margin-left: 290px;
          }
          #position{
            margin-left: 10px;
            margin-top: 40px;
            .publbut {
                      color: #9fc5e8;
                      height: 35px;
                      width: 25px;
                    }
            #CRN1{
              #label1{
                      margin-bottom: 10px;
                    }
            }
            #CRN2{
              margin-top: 50px;
              .publbut {
                      color: #9fc5e8;
                      height: 35px;
                      width: 25px;
                      }
              #label2{
                      margin-bottom: 10px;
                    }
            }
          }
        }
        #app2{
          .title-info2{
            font-size: 20px;
            font-weight: bold;
            font-style: italic;
            margin-left: 10px;
            margin-top: 60px;
          }
        }
        }
</style>
