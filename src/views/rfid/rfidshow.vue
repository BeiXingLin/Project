<template>
  <div class="">
    <!-- <el-card>当前托盘RFID条码</el-card> -->
    <el-card >
          <el-timeline class="lineProcess">
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :timestamp="activity.timestamp">
                {{activity.content}}
              </el-timeline-item>
          </el-timeline>
      </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  data () {
    return {
      activities: [{
          content: '等待托盘到位',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more'
        }, {
          content: '读取RFID信息',
          timestamp: '2018-04-03 20:46',
          color: '#0bbd87'
        }, {
          content: '写入RFID信息',
          timestamp: '2018-04-03 20:46',
          size: 'large'
        }, {
          content: '等待托盘离开',
          timestamp: '2018-04-03 20:46'
        }]}
  },
  components: {
    
  },
  computed: {
    
  },
  mounted: {
    
  },
  watch: {
    
  },
  methods: {
    
  },
  created () {
    
  },
  mounted () {
    
  },
}
</script>

<style scoped>
  .lineProcess{
    margin: 50px;
  }
</style>
