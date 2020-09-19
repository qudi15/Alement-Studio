<template>
  <el-input
    v-model="comValue"
    v-show="!hidden"
    @change="onChange"
    @blur="onBlur"
    @focus="onFocus"
    @input="onInput"
    @clear="onClear"
    :type="type"
    :minlength="minLength"
    :maxlength="maxLength"
    :placeholder="placeholder"
    :clearable="clearable"
    :show-password="showPassword"
    :rows="rows"
    :autosize="autoSize"
    :disabled="disabled"
    :readonly="readonly"
  >
  </el-input>
</template>

<script>
import baseMixin from '../../mixins/base'
/**
 * 输入框
 * @displayName Al Input
 */
export default {
  name: 'al-input',
  mixins: [baseMixin],
  props: {
    /**
     * 值
     * @value string
     */
    value: {
      type: String
    },
    /**
     * 类型
     * @value string
     */
    type: {
      type: String
    },
    /**
     * 最短文本长度
     * @value number
     */
    minLength: {
      type: Number
    },
    /**
     * 最长文本长度
     * @value number
     */
    maxLength: {
      type: Number
    },
    /**
     * 占位符
     * @value string
     */
    placeholder: {
      type: String
    },
    /**
     * 清除
     * @values true / false
     */
    clearable: {
      type: Boolean,
      default: false
    },
    /**
     * 显示切换密码图标
     * @values true / false
     */
    showPassword: {
      type: Boolean,
      default: false
    },
    /**
     * 输入框行数
     * @value number
     */
    rows: {
      type: Number
    },
    /**
     * 自适应内容高度
     * @values boolean / object
     */
    autoSize: {
      type: [Boolean, Object]
    },
    /**
     * 禁用状态
     * @values true / false
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * 只读
     * @values true / false
     */
    readonly: {
      type: Boolean,
      default: false
    },
    /**
     * 自定义校验规则
     * @value array
     */
    rules: {
      type: Array
    },
    /**
     * 输入框关联文字
     * @value string
     */
    label: {
      type: String
    },
    /**
     * 输入框关联文字位置
     * @values top / left
     */
    labelPosition: {
      type: String
    },
    /**
     * 输入框关联文字宽度
     * @value string
     */
    labelWidth: {
      type: String
    },
    /**
     * 视觉隐藏
     * @values true / false
     */
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    comValue: {
      get () {
        return this.value
      },
      set (val) {
        this.onInput(val)
      }
    }
  },
  methods: {
    onChange (e) {
    /**
     * 改变文本事件
     * @event change
     * @type {Event}
     */
      this.$emit('change', e)
    },
    onBlur (e) {
    /**
     * 失去焦点事件
     * @event blur
     * @type {Event}
     */
      this.$emit('blur', e)
      this.$emit('onBlur', e)
    },
    onFocus (e) {
    /**
     * 获取焦点事件
     * @event focus
     * @type {Event}
     */
      this.$emit('focus', e)
    },
    onInput (e) {
    /**
     * 输入事件
     * @event input
     * @type {Event}
     */
      this.$emit('input', e)
    },
    onClear (e) {
    /**
     * 清空事件
     * @event clear
     * @type {Event}
     */
      this.$emit('clear', e)
    }
  }
}
</script>
<docs>

## 演示

默认值

```jsx
<al-input default-value="Hello world" />
```

输入框类型

```jsx
<al-input type="text" default-value="Hello world" />
<al-input type="textarea" default-value="Hello world" />
```

最小长度

```jsx
<al-input :min-length="6" default-value="Hello world" />
```

最大长度

```jsx
<al-input :max-length="6" default-value="Hello world" />
```

占位符

```jsx
<al-input placeholder="请选择..." />
```

可清除

```jsx
<al-input :clearable="true" default-value="Hello world" />
<al-input :clearable="false" default-value="Hello world" />
```

显示切换密码图标

```jsx
<al-input :show-password="true" default-value="Hello world" />
<al-input :show-password="false" default-value="Hello world" />
```

输入框行数

```jsx
<al-input type="textarea" :rows="2" default-value="Hello world" />
```

自适应内容高度

```jsx
<al-input type="textarea" :auto-size="true" default-value="Hello world" />
<al-input type="textarea" :auto-size="false" default-value="Hello world" />
<al-input type="textarea" :auto-size="{ minRows: 2, maxRows: 6 }" default-value="Hello world" />
```

禁用状态

```jsx
<al-input :disabled="true" default-value="Hello world" />
<al-input :disabled="false" default-value="Hello world" />
```

只读

```jsx
<al-input :read-only="true" default-value="Hello world" />
<al-input :read-only="false" default-value="Hello world" />
```
</docs>
