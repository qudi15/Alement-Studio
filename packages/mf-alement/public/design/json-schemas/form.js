export default {
  tag: 'al-form', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value
  children: [], // 子节点
  hide: false,
  attrs: {
    // 节点的特殊属性 key: value
    labelPosition: 'top' | 'left' | 'right', // label的位置 默认left form和form下的元素都有的时候那么以form下的元素为准
    labelWidth: '', // label的宽度 labelPosition为left时生效 form和form下的元素都有的时候那么以form下的元素为准
    disabled: false, // form和form下的元素都有的时候那么以form下的元素为准
    readonly: false, // form和form下的元素都有的时候那么以form下的元素为准
    loading: false,
    cols: 1 // 一行有几个控件 默认一行一个
  },
  hooks: { // key小驼峰
    beforeSubmit: (model, extraModel) => {},
    afterSubmit: (model, extraModel) => {}
  },
  events: {
    // 节点的事件 key: function() {} key小驼峰
    submit: (model, extraModel) => {},
    reset: (model, extraModel) => {},
    validate: (model, extraModel, validateResult) => {} // 函数返回promise
  }
}
