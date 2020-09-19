// 穿梭框 https://element.eleme.cn/#/zh-CN/component/transfer 优先级不高
export default {
  tag: 'al-transfer', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value
  children: [], // 子节点
  hide: false,
  attrs: {
    key: 'a | a.b.c', // 取值路径
    rules: [],
    label: '', // 字段的label
    labelPosition: 'top' | 'left', // label的位置 默认left
    labelWidth: '', // label的宽度 labelPosition为left时生效
    options: [
      { value: '', text: '', disabled: true }
    ],
    targetOrder: 'original / push / unshift', // 右侧列表元素的排序策略：若为 original，则保持与数据源相同的顺序；若为 push，则新加入的元素排在最后；若为 unshift，则新加入的元素排在最前
    titles: ['', ''], // 自定义列表标题 ['列表 1', '列表 2']
    buttonTexts: ['', ''] // 自定义按钮文案 默认为 > <
  },
  events: {
    change: (value, model, extraModel) => {},
    leftCheckChange: (value, model, extraModel) => {},
    rightCheckChange: (value, model, extraModel) => {}
  }
}
