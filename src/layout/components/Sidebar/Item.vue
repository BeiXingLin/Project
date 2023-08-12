<script>
export default {
  name: 'MenuItem',
  functional: true, // 函数式组件
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
      console.log("进入layout的components的sidebar里面的item.vue的render")
      console.log("context",context)
      console.log("h",h)
    // 图标 和标题
    const { icon, title } = context.props
    console.log("获取图标和标题")
    console.log("context.props为",context.props)
    console.log("icon",icon)
    console.log("title",title)
    const vnodes = []
    // 渲染图标
    console.log("渲染图标")
    if (icon) {
      console.log("icon",icon)
      if (icon.includes('el-icon')) {
        console.log("icon.includes('el-icon')满足",icon.includes('el-icon'))
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
        console.log("vnodes",vnodes)
      } else {
        console.log("icon.includes('el-icon')不满足",icon.includes('el-icon'))
        vnodes.push(<svg-icon icon-class={icon}/>)
        console.log("vnodes",vnodes)
      }
    }
    // 渲染标题
    console.log("渲染标题")
    if (title) {
      console.log("title",title)
      vnodes.push(<span slot='title'>{(title)}</span>)
      console.log("vnodes",vnodes)
    }
    console.log("渲染完毕后vnodes",vnodes)
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}

</style>
