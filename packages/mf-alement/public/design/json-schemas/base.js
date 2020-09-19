export default {
  tag: '', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value key小驼峰
  children: [], // 子节点
  hide: false,
  attrs: {
    // 节点的特殊属性 key: value key小驼峰
  },
  events: {
    // 节点的事件 key: function() {} key小驼峰
  },
  hooks: { // key小驼峰

  }
}
