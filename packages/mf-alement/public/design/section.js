export default {
  tag: 'al-section', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value
  children: [], // 子节点 {label:string, ...}
  visible: false,
  attrs: {
    // 节点的特殊属性 key: value
    expand: true | false, // 收缩展开
    collapse: true | false, // collapse为true expand才好用
    title: ''
  },
  events: {
    // 展开事件
    onShow: () => {},
    // 收缩事件
    onHide: () => {}
  }
}
