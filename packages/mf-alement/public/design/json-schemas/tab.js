// 标签页
export default {
  tag: 'al-tab', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value
  hide: false,
  children: [],
  attrs: {
    type: '', // card/border-card
    closable: false,
    addable: false,
    editable: false, // 标签是否同时可增加和关闭
    tabPosition: '', // 选项卡所在位置 top/right/bottom/left
    stretch: false, // 标签的宽度是否自撑开
    disalbed: false,
    options: [
      { value: 'name', text: 'label', disabled: true, closable: false }
    ]
  },
  events: {
    tabClick: (tabValue, oldTabValue) => {},
    tabRemove: (tabValue) => {},
    tabAdd: (targetValue) => {},
    edit: (targetValue, action) => {} // 点击 tabs 的新增按钮或 tab 被关闭后触发，action add/remove
  },
  hooks: {
    beforeLeave: (activeName, oldActiveName) => {} // 切换标签之前的钩子 返回true false el 返回的是promise
  }
}
