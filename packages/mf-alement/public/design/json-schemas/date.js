export default {
  tag: 'al-date', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value
  hide: true, // 视觉上的隐藏
  attrs: {
    // 节点的特殊属性 key: value
    key: 'a | a.b.c', // 取值路径,
    value: '' | [], // 默认值
    // key和format同时存在 key不生效
    format: (model, extraModel) => {
      return '' | []
    },
    parse: (value, model, extraModel) => {
      // 处理逻辑
    },
    type: 'year/month/date/dates/ week/datetime/datetimerange/ daterange/monthrange',
    valueFormat: 'yyyy-mm-dd', // 日期格式
    placeholder: '' | [],
    readonly: true,
    disabled: true,
    clearable: true,
    // editable: false,
    // 设置禁止选择的日期
    disabledDate: (value, model, extraModel) => {
      return value.getTime() > Date.now()
    },
    // 自定义校验方法 value当前值 model父级表单的值 extraModel
    rules: [],
    label: '', // 字段的label
    labelPosition: 'top' | 'left', // label的位置 默认left
    labelWidth: '' // label的宽度 labelPosition为left时生效
  },
  events: {
    // 节点的事件 key: function() {}
    change: (value, model, extraModel) => {},
    blur: (value, model, extraModel) => {},
    focus: (value, model, extraModel) => {}
  }
}
