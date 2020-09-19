export default {
  tag: 'al-select', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value
  hide: false,
  attrs: {
    // 节点的特殊属性 key: value
    key: 'a | a.b.c', // 取值路径
    value: '' | [], // 默认值
    multiple: false,
    collapseTags: false, // 多选时是否将选中值按文字的形式展示
    multipleLimit: 10, // 多选时用户最多可以选择的项目数，为 0 则不限制
    placeholder: '',
    disabled: true,
    clearable: true,
    loading: true,
    // 组件的选项 value表示实际值 text表示显示值
    options: [
      { value: '', text: '', disabled: false, group: '' }
    ],
    // 自定义校验方法 value当前值 model父级表单的值 list当控件在table中时为table的值 否则为null
    rules: [],
    label: '', // 字段的label
    labelPosition: 'top' | 'left', // label的位置 默认left
    labelWidth: '' // label的宽度 labelPosition为left时生效
  },
  events: {
    // 节点的事件 key: function() {}
    change: (value, model, extraModel) => {},
    clear: (value, model, extraModel) => {},
    blur: (value, model, extraModel) => {},
    focus: (value, model, extraModel) => {},
    selectionVisible: () => {},
    selectionHidden: () => {}
  }
}
