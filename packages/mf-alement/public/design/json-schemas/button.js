export default {
  tag: 'al-button', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value
  children: [], // 按钮要有子节点 按钮内部文本节点或者其他节点
  hide: false,
  attrs: {
    // 节点的特殊属性 key: value
    type: 'primary / success / warning / danger / info / text', // 按钮的类型
    loading: true,
    disabled: true
  },
  events: {
    // 节点的事件 key: function() {}
    click: () => {}
  }
}
