export default {
  tag: 'al-text', // 标签名 * 文本节点 暂时用span标签来包裹内容
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value
  children: [], // 子节点
  hide: false,
  attrs: {
    // 节点的特殊属性 key: value
    key: 'a | a.b.c', // 取值路径,
    // htmlTag: '', // 文字的标签
    format: (model, extraModel) => {
      return ''
    }
  }
}
