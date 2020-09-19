// 利用checkbox-group组件 内部的checkbox name id 为父节点对应属性+index
// 外层的disabled为true 里面无论是什么都不生效
export default {
  tag: 'al-checkbox', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value
  hide: true, // 视觉上的隐藏
  attrs: {
    // 节点的特殊属性 key: value
    key: 'a | a.b.c', // 取值路径
    disabled: true,
    value: '', // 默认值
    // 组件的选项 value表示实际值 text表示显示值
    options: [
      { value: '', text: '', disabled: true }
    ],
    // 自定义校验方法 value当前值 model父级表单的值 extraModel需要额外处理的model
    rules: [
      { required: true, message: '请输入活动名称', trigger: 'blur, changex' },
      {
        alValidator: (value, model, callback, extraModel) => {
          // callback(new Error('请输入密码')); // 校验失败
          // callback(); // 校验成功
        },
        trigger: 'blur'
      }
    ],
    label: '', // 字段的label
    labelPosition: 'top' | 'left', // label的位置 默认left
    labelWidth: '' // label的宽度 labelPosition为left时生效
  },
  events: {
    // 节点的事件 key: function() {}
    change: (value, model, schema, extraSchema) => {}
  }
}
