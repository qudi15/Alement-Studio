// 级联选择器 参考 https://element.eleme.cn/#/zh-CN/component/cascader 优先级不高 需求待定
export default {
  tag: 'al-cascader', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value
  children: [], // 子节点
  hide: true, // 视觉上的隐藏
  attrs: {
    key: 'a | a.b.c', // 取值路径
    rules: [],
    label: '', // 字段的label
    labelPosition: 'top' | 'left', // label的位置 默认left
    labelWidth: '', // label的宽度 labelPosition为left时生效
    options: [
      { value: '', text: '', disabled: true, children: [] }
    ],
    placeholder: '',
    disabled: false,
    clearable: false,
    showAllLevels: true, // 输入框中是否显示选中值的完整路径
    collapseTags: false, // 多选模式下是否折叠Tag
    separator: '', // 选项分隔符
    popperClass: '', // 自定义浮层类名
    multiple: false,
    expandTrigger: 'click' | 'hover' // 次级菜单的展开方式
  },
  events: {
    // 节点的事件 key: function() {}
    change: (value, model, extraModel) => {},
    // expandChange: (value, model, extraModel) => {}, // 当展开节点发生变化时触发/回调参数: 各父级选项值组成的数组
    blur: (value, model, extraModel) => {},
    focus: (value, model, extraModel) => {},
    visibleChange: (flag) => {}, // 下拉框出现/隐藏时触发 出现则为 true，隐藏则为 false
    removeTag: (value) => {} // 在多选模式下，移除Tag时触发/回调参数: 移除的Tag对应的节点的值
  }
}
