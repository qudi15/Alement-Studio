// 如果search需要支持输入查询的话 那么得加上loading selection-show selection-hidden的事件
export default {
  tag: 'al-modal', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value
  children: [], // 子节点
  // hide: true, // 视觉上的隐藏 modal 隐藏不用这个属性
  attrs: {
    title: '', // 模态框标题
    children: [], // 子组件
    lockScroll: true, // 是否锁定body 禁止滚动
    showClose: true, // 显示关闭按钮
    appendToBody: true // 插入Body
  },
  events: {
    // 容器组件显示的事件 没有显示隐藏逻辑的容器组件不用加
    onShow: (model, extraModel) => {},
    // 容器组件隐藏的事件 没有显示隐藏逻辑的容器组件不用加
    onHide: (model, extraModel) => {}
  }
}
