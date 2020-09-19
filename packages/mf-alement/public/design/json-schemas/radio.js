// 利用radio-group组件 内部的radio name id 为父节点对应属性+index
export default {
  tag: 'al-radio', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value
  hide: false,
  attrs: {
    // 节点的特殊属性 key: value
    key: 'a | a.b.c', // 取值路径
    disabled: true,
    // 组件的选项 value表示实际值 text表示显示值
    options: [
      { value: '', text: '', disabled: false }
    ],
    // 自定义校验方法 value当前值 model父级表单的值 list当控件在table中时为table的值 否则为null
    rules: [],
    label: '', // 字段的label
    labelPosition: 'top' | 'left', // label的位置 默认left
    labelWidth: '' // label的宽度 labelPosition为left时生效
  },
  events: {
    // 节点的事件 key: function() {}
    change: (value, model, extraModel) => {}
  }
}
