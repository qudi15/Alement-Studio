export default {
  tag: 'al-input', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value
  hide: true, // 视觉上的隐藏
  attrs: {
    // 节点的特殊属性 key: value
    key: 'a | a.b.c', // 取值路径
    type: 'text，textarea',
    minlength: 6,
    maxlength: 6,
    placeholder: '',
    clearable: true,
    showPassword: false, // showPassword为true的时候 input的type为password
    rows: 2,
    autosize: true || { minRows: 2, maxRows: 6 },
    disabled: true,
    readonly: true,
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
    input: (value, model, extraModel) => {},
    clear: (value, model, extraModel) => {}
  }
}
