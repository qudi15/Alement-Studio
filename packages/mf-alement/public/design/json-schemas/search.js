export default {
  tag: '', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  style: {}, // 节点的style key: value
  children: [], // 子节点
  hide: false,
  attributes: {
    // 节点的特殊属性 key: value
    schema: {}
  },
  events: {
    // 容器组件显示的事件 没有显示隐藏逻辑的容器组件不用加
    onShow: (model, extraModel) => {},
    // 容器组件隐藏的事件 没有显示隐藏逻辑的容器组件不用加
    onHide: (model, extraModel) => {}
  },
  hooks: {

  }
}
