export default {
  tag: 'al-breadcrumb', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value
  hide: false,
  attrs: {
    separator: '/',
    options: [
      { value: 'name', text: 'label', to: '' | {}, replace: false }
    ]
  },
  events: {
    click: (node) => {}
  }
}
