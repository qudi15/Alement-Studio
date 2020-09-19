// 颜色选择器 https://element.eleme.cn/#/zh-CN/component/color-picker
export default {
  tag: '', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value
  hide: true, // 视觉上的隐藏
  attrs: {
    // 节点的特殊属性 key: value
    key: 'a | a.b.c', // 取值路径
    disabled: true,
    showAlpha: true, // 是否支持透明度选择
    colorFormat: '', // hsl / hsv / hex / rgb, hex（show-alpha 为 false）/ rgb（show-alpha 为 true）
    predefine: [], // 预定义颜色
    // 自定义校验方法 value当前值 model父级表单的值 list当控件在table中时为table的值 否则为null
    rules: [],
    label: '', // 字段的label
    labelPosition: 'top' | 'left', // label的位置 默认left
    labelWidth: '' // label的宽度 labelPosition为left时生效
  },
  events: {
    // 节点的事件 key: function() {}
    change: (value, model, extraModel) => {},
    activeChange: (value, model, extraModel) => {}
  }
}
