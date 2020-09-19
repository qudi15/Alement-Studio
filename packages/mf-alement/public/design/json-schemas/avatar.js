export default {
  tag: 'al-avatar', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value
  hide: false,
  children: [],
  attrs: {
    src: '',
    size: String | Number, // large / medium / small | number
    srcSet: '', // img的srcSet属性
    alt: '',
    shape: 'circle / square',
    fit: 'fill / contain / cover / none / scale-down' // 当展示类型为图片的时候，设置图片如何适应容器框
  },
  events: {
    error: (event) => {} // 图片类头像加载失败的回调
  }
}
