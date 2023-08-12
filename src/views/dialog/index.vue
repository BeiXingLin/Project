<template>
  <div class="dialogcontainer">
    <div class="picker">
      <h5>站点:</h5>
      <el-select v-model="dateValue" clearable placeholder="请选择" size="medium" style="width: 150px;"  @change="typeSearch()" >
      <el-option v-for="item in warningtype" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
      </el-select>
      &nbsp;&nbsp;
      <h5>时间:</h5>
      <el-date-picker v-model="valuetime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="medium" @change="submitDateTime()">
      </el-date-picker>
      &nbsp;&nbsp;
      <h5>类型:</h5>
      <el-select v-model="dateValue" clearable placeholder="全部类型" size="medium" style="width: 150px;" @change="typeSearch()">
      <el-option v-for="item in warningtype" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
      </el-select>
      &nbsp;&nbsp;
      <h5>条码:</h5>
      <el-input v-model="input" placeholder="请输入条码" size="medium" clearable style="width: 150px;"></el-input>
      &nbsp;&nbsp;
      <el-button size="mini" type="primary" icon="el-icon-search"   @click="checkTask">查询</el-button>
      <el-button size="mini" type="info"  icon="el-icon-refresh"   @click="reSet"> 重置</el-button>
      <el-button size="mini" type="primary" icon="el-icon-share"   @click="exportExcel"> 导出</el-button>
      <el-button type="info" size="mini" icon="el-icon-refresh-right"  @click="checkTask" >刷新</el-button>
    </div>
    <div class="dialogtable">
      <el-table  border  row-key="id" :header-cell-style="{background:'#ebf1f6'}" :cell-style="{background:'#ebf1f6'}">
          <el-table-column :label="$t('station.ID')"  align="center">
            <template slot-scope="{ $index }">
            <span>{{ $index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column  label="条码/任务号/站点名" />
          <el-table-column  label="开始时间"  />
          <el-table-column  label="结束时间" />
          <el-table-column  label="结果" />
          <el-table-column  label="操作" />
        </el-table> 
    </div>
    <el-row style="height: 60px" align="middle" type="flex" justify="end">
      <el-pagination
            background
            layout="total,sizes,prev, pager, next,jumper"
            :total="total"
            :current-page="queryParams.page"
            :page-size="queryParams.pagesize"
            @current-change="changePage"
            @size-change="handleSizeChange"
            class="pagination-footer"
          />
    </el-row> 
  </div>
</template>

<script>
import { addPermission } from '@/api/permission';
import FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

export default {
  name: '',
  props: {},
  data () {
    return {
      dateValue: "1", // 时间选择状态
            valuetime: [],
            warningtype: [{
                value: '1',
                label: '全部'
            }, {
                value: '2',
                label: '完成'
            }, {
                value: '3',
                label: '未完成'
            }],
            // 获取列表查询参数对象
            queryInfo: {
                current: 1,
                size: 9,
                status: ['NOT_START', 'ANSWER_IN_PROGRESS', 'DATA_UNDER_REVIEW', 'REPORT']
            },
            option: null,
            timer: null,
            xData: [],
            now: new Date(2019, 1, 1),
            value: Math.random() * 1000,
            oneDay: 24 * 3600 * 1000,
            list:[{"ID":addPermission,"TASK":addPermission,"Time1":addPermission,"Time2":addPermission,"Result":addPermission,}],
            queryParams: {
                page: 1, // 当前页码
                pagesize: 10,
            },
            total: 0,
    }
  },
  components: {
    
  },
  computed: {
    
  },
  mounted() {
    this.renderChart(); // 在组件挂载后渲染图表
  },
  watch: {
    
  },
  methods: {
      //导出el-table中的数据为Excel文件
      exportExcel() {
      const excelData = this.getExcelData(); // 获取要导出的表格数据
      console.log(excelData)
      const worksheet = XLSX.utils.json_to_sheet(excelData); // 将数据转化为worksheet对象
      const workbook = XLSX.utils.book_new(); // 创建一个新的workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1'); // 将worksheet添加到workbook
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' }); // 将workbook转化为Excel的二进制数据
      this.saveAsExcelFile(excelBuffer, '任务日志.xlsx'); // 将二进制数据保存为Excel文件
    },
    getExcelData(){
      return this.list.map(item => ({
        序号: item.ID,
        任务: item.TASK,
        时间: item.Time1,
      }));
    },
    saveAsExcelFile(buffer, fileName) {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();

      window.URL.revokeObjectURL(url);
    },
    renderChart() {
      // 后端数据
      const backendData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
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
    },
    timeSearch() {
            console.log('22')
            switch (this.dateValue) {
                case "1":
                    // 开始时间
                    this.queryInfo.releaseDateFloor = ''
                    // 结束时间
                    this.queryInfo.releaseDateCeil = ''
                    break;
                case "2":
                    var m = new Date();
                    m.setMonth(m.getMonth() - 1);
                    this.queryInfo.releaseDateCeil = timeFormat(new Date())
                    this.queryInfo.releaseDateFloor = timeFormat(m)
                    break;
                case "3":
                    var m = new Date();
                    m.setMonth(m.getMonth() - 6);
                    this.queryInfo.releaseDateCeil = timeFormat(new Date())
                    this.queryInfo.releaseDateFloor = timeFormat(m)
                    break;
                case "4":
                    var y = new Date();
                    y.setFullYear(y.getFullYear() - 1);
                    this.queryInfo.releaseDateCeil = timeFormat(new Date())
                    this.queryInfo.releaseDateFloor = timeFormat(y)
                    break;
            }
            // 调用加载数据的函数
            this.getScreenList(this.queryInfo)
        },
        //时间选择器 搜索
        submitDateTime() {
            // console.log(this.valuetime, "valuetime")
            if (this.valuetime) {
                this.queryInfo.releaseDateFloor = timeFormat(this.valuetime[0])
                this.queryInfo.releaseDateCeil = timeFormat(this.valuetime[1])
                this.getScreenList(this.queryInfo)
                // console.log(Object.prototype.toString.call(this.queryInfo.releaseDateCeil), "类型类型")

            } else if (this.valuetime == null) {
                this.queryInfo.releaseDateFloor = ''
                this.queryInfo.releaseDateCeil = ''
                this.getScreenList(this.queryInfo)

            }
        },
        randomData() {
				this.now = new Date(+this.now + this.oneDay)
				this.value = this.value + Math.random() * 25 - 10
				return {
					name: this.now.toString(),
					value: [
						[this.now.getFullYear(), this.now.getMonth() , this.now.getDate()].join('/'),
						Math.round(this.value)
					]
				}
			},
 
			getEchart() {
				let myChart = this.$echarts.init(document.getElementById('chart-dynamic-line'));
				for (let i = 0; i < 1000; i++) {
				this.xData.push(this.randomData());
			}
 
				this.option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							axisPointer: {
								type: 'cross',
								label: {
									backgroundColor: '#283b56'
								}
							}
						}
					},
					grid: {
						top: '15%',
						left: '10%',
						right: '12%',
						bottom: '15%',
						containLabel: true
					},
					color: ['#b54c5d'],
					calculable: true,
					xAxis: {
						type: 'time',
						name: '年-月-日',
						boundaryGap: false,
						splitNumber: 5,
						axisLabel: {
							formatter(value) {
								let date = new Date(value);
								return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
							}
						},
						axisTick: {
							show: false
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: '#0084ff'
							}
						},
						splitLine: {
							show: false
						}
					},
					yAxis: {
						type: 'value',
						scale: true,
						name: '比特币（美元）',
						min: 0,
						boundaryGap: false,
						axisTick: {
							show: false
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: '#0084ff'
							}
						},
						splitLine: {
							show: false
						},
					},
					series: [{
						name: '实时交易',
						type: 'line',
						xAxisIndex: 0,
						yAxisIndex: 0,
						itemStyle: {
							opacity: 0,
						},
						data: this.xData,
						smooth: true
					}]
				}
 
				myChart.setOption(this.option, true);
 
				window.addEventListener('resize', () => {
					myChart.resize();
				});
				
				this.timer = setInterval(() => {
					for (let i = 0; i < 5; i++){
						this.xData.shift();
						this.xData.push(this.randomData());
					}
					myChart.setOption(this.option, true);
				},200)
			}


  },
  created () {
    
  },
  mounted () {
    
  },
}
</script>

<style lang="scss" scoped>
  .dialogcontainer{
    background-color:#ebf1f6;
    .picker{
      padding: 5px;
      display: flex;
      margin:1px ;
      align-items: center;
    }
    .dialogtable{
      display: flex;
    }
    .pagination-footer{
        position: absolute;
        text-align: center;
        background-color:#ebf1f6;
        left: 0;
        bottom: 0;
        width: 100%;
      }
}

</style>
