export default {
  tag: 'al-time', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value
  hide: false,
  attrs: {
    // 节点的特殊属性 key: value
    key: 'a | a.b.c', // 取值路径,
    format: (model, extraModel) => {
      return ''
    },
    parse: (value, model, extraModel) => {
      // 处理逻辑
    },
    value: '' | [], // 默认值
    placeholder: '' | [], // 范围选择时为数组 0-开始 1-对应结束
    readonly: true,
    disabled: true,
    clearable: true,
    // editable: false,
    isSelect: false,
    isRange: false,
    minTime: '00:00',
    maxTime: '24:00',
    step: '00:10',
    selectableRange: '' | ['09:30:00 - 12:00:00', '14:30:00 - 18:30:00'], // 可选时间段
    // 自定义校验方法 value当前值 model父级表单的值 list当控件在table中时为table的值 否则为null
    rules: [],
    label: '', // 字段的label
    labelPosition: 'top' | 'left', // label的位置 默认left
    labelWidth: '' // label的宽度 labelPosition为left时生效
  },
  events: {
    // 节点的事件 key: function() {}
    change: (value, model, extraModel) => {},
    blur: (value, model, extraModel) => {},
    focus: (value, model, extraModel) => {},
    clear: (value, model, extraModel) => {}
  }
}
