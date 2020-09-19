<template>
  <!--  options 大于1, 使用el-radio-group-->
  <el-radio-group
    v-if="options.length > 1"
    v-bind:class="classList"
    v-bind:style="styleMap"
    v-model="radioValue"
    v-show="!hide"
    @change="onChange"
    :disabled="disabled"
  >
    <el-radio
      v-for="(item, index) in options"
      :key="index"
      :disabled="item.disabled"
      :label="item.value"
    >{{item.text}}</el-radio>
  </el-radio-group>

  <!--  options 唯一, 单独使用el-radio-->
  <el-radio
    v-else
    v-bind:class="classList"
    v-bind:style="styleMap"
    v-model="radioValue"
    v-show="!hide"
    @change="onChange"
    :disabled="disabled"
    :label="options[0].value"
  >{{options[0].text}}</el-radio>
</template>

<script>
import baseMixin from '../../mixins/base'
/**
 * 单选框
 * @displayName Al Radio
 */
export default {
  name: 'al-radio',
  mixins: [baseMixin],
  props: {
    /**
     * 默认值
     * @value string
     */
    value: {
      type: String
    },
    /**
     * 禁用状态
     * @values true / false
     */
    disabled: {
      type: Boolean
    },
    /**
     * 组件选项
     * @value array
     */
    options: {
      type: Array
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
    hide: {
      type: Boolean
    }
  },
  data () {
    return {
      radioValue: ''
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        if (this.options && this.options.length && val) {
          this.updateDefaultValue()
        }
      }
    }
  },
  methods: {
    updateDefaultValue () {
      const defaultValue = this.options.filter(option => option.value === this.value)
      this.radioValue = defaultValue[0].value
    },
    onChange (e) {
      /**
       * 勾选事件
       * @event change
       * @type {Event}
       */
      this.$emit('change', e)
    }
  }
}
</script>

<docs>

## 演示

单个单选框

```jsx
<al-radio :options="[{ value: '1', text: '西瓜', disabled: false }]" />
```

单选框组

```jsx
<al-radio
  :options="[
    { value: '1', text: '西瓜', disabled: false },
    { value: '2', text: '草莓', disabled: false },
    { value: '3', text: '香蕉', disabled: false }
  ]"
/>
```

禁用单选框

```jsx
<al-radio
  :disabled="true"
  :options="[{ value: '1', text: '西瓜', disabled: false }]"
/>
<al-radio
  :disabled="true"
  :options="[
    { value: '1', text: '西瓜', disabled: false },
    { value: '2', text: '草莓', disabled: false },
    { value: '3', text: '香蕉', disabled: false }
  ]"
/>
<al-radio
  :disabled="false"
  :options="[
    { value: '1', text: '西瓜', disabled: false },
    { value: '2', text: '草莓', disabled: true },
    { value: '3', text: '香蕉', disabled: true }
  ]"
/>
```

默认值

```jsx
<al-radio
  :value="'2'"
  :options="[
    { value: '1', text: '西瓜', disabled: false },
    { value: '2', text: '草莓', disabled: false },
    { value: '3', text: '香蕉', disabled: false }
  ]"
/>
```
</docs>
