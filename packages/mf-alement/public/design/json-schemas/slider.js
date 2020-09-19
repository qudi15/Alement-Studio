// 滑块 参考 https://element.eleme.cn/#/zh-CN/component/slider
export default {
  tag: 'al-slider', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value
  hide: false,
  attrs: {
    // 节点的特殊属性 key: value
    key: 'a | a.b.c', // 取值路径
    min: 6,
    max: 6,
    step: 1,
    showStops: true, // 是否显示间断点
    showTooltip: false, // 是否显示 tooltip
    // 格式化 tooltip message
    formatTooltip: (value) => {
      return value
    },
    range: false, // 是否为范围选择
    disabled: true,
    // 自定义校验方法 value当前值 model父级表单的值 list当控件在table中时为table的值 否则为null
    rules: [],
    label: '', // 字段的label
    labelPosition: 'top' | 'left', // label的位置 默认left
    labelWidth: '' // label的宽度 labelPosition为left时生效
  },
  events: {
    // 节点的事件 key: function() {}
    change: (value, model, extraModel) => {}
    // input: (value, model, extraModel) => {}, 只支持手动拖拽 不支持从input输入 所以不用input 后续需要支持再加
  }
}
