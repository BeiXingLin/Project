<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    isExternal() {
      console.log("进入layout的components的sidebar里面的link.vue的isExternal计算属性")
      return isExternal(this.to)
    },
    type() {
      console.log("进入layout的components的sidebar里面的link.vue的type计算属性")
      if (this.isExternal) {
        console.log("this.isExternal满足",this.isExternal)
        console.log("返回a标签")
        return 'a'
      }
      console.log("this.isExternal不满足",this.isExternal)
      console.log("返回router-link标签")
      return 'router-link'
    }
  },
  methods: {
    linkProps(to) {
      console.log("进入layout的components的sidebar里面的link.vue的linkProps方法")
      console.log("传入to",to)
      if (this.isExternal) {
        console.log("this.isExternal满足",this.isExternal)
        console.log("返回 return {href: to,target: _blank,rel: noopener}")
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      console.log("this.isExternal不满足",this.isExternal)
      console.log("返回 return {to: to}")
      return {
        to: to
      }
    }
  }
}
</script>
