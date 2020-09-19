// 如果search需要支持输入查询的话 那么得加上loading selection-show selection-hidden的事件
export default {
  tag: 'al-drawer', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value
  children: [], // 子节点
  // hide: true, // 视觉上的隐藏 modal 隐藏不用这个属性
  attrs: {
    // 节点的特殊属性 key: value
    schema: {},
    showClose: true, // 显示关闭按钮
    direction: 'rtl', // rtl ltl
    withHeader: true, // 显示header
    title: '', // 标题
    drawerVisible: false // 侧边栏是否开启
  },
  events: {
    // 节点的事件 key: function() {}
    open: () => {},
    close: () => {}
  }
}
