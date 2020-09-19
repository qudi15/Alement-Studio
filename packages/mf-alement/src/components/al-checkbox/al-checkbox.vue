<template>
<!--  options 大于1, 使用el-checkbox-group-->
  <el-checkbox-group
    v-if="options.length > 1"
    v-bind:class="classList"
    v-bind:style="styleMap"
    v-model="optionsValue"
    v-show="!hidden"
    @change="onChange"
    :disabled="disabled"
  >
    <el-checkbox
      v-for="(item, index) in options"
      :key="index"
      :disabled="item.disabled"
      :label="item.text"
      :value="item.value"
    ></el-checkbox>
  </el-checkbox-group>

<!--  options 唯一, 单独使用el-checkbox-->
  <el-checkbox
    v-else-if="options.length === 1"
    v-bind:class="classList"
    v-bind:style="styleMap"
    v-model="optionsValue"
    v-show="!hidden"
    @change="onChange"
    :disabled="disabled"
    :label="options[0].text"
  ></el-checkbox>
</template>

<script>
import baseMixin from '../../mixins/base'
/**
 * 勾选框
 * @displayName Al Checkbox
 */
export default {
  name: 'al-checkbox',
  mixins: [baseMixin],
  props: {
    /**
     * 默认值
     * @value array
     */
    value: {
      type: Array
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
     * 视觉隐藏
     * @values true / false
     */
    hidden: {
      type: Boolean
    }
  },
  data () {
    return {
      optionsValue: []
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        if (
          this.options &&
          this.options.length &&
          val &&
          val.length
        ) {
          this.updateDefaultValue(val)
        }
      }
    }
  },
  methods: {
    updateDefaultValue (val) {
      this.optionsValue = []
      val.forEach(v => {
        this.options.forEach(option => {
          if (option.value === v) {
            this.optionsValue.push(option.text)
          }
        })
      })
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

单个勾选框

```jsx
<al-checkbox :options="[{ value: 1, text: '西瓜', disabled: false }]" />
```

多个勾选框

```jsx
<al-checkbox
  :options="[
    { value: 1, text: '西瓜', disabled: false },
    { value: 2, text: '草莓', disabled: false },
    { value: 3, text: '香蕉', disabled: false }
  ]"
/>
```

禁用勾选框

```jsx
<al-checkbox
  :disabled="true"
  :options="[{ value: 1, text: '西瓜', disabled: false }]"
/>
<al-checkbox
  :disabled="true"
  :options="[
    { value: 1, text: '西瓜', disabled: false },
    { value: 2, text: '草莓', disabled: false },
    { value: 3, text: '香蕉', disabled: false }
  ]"
/>
<al-checkbox
  :disabled="false"
  :options="[
    { value: 1, text: '西瓜', disabled: false },
    { value: 2, text: '草莓', disabled: true },
    { value: 3, text: '香蕉', disabled: true }
  ]"
/>
```

默认值

```jsx
<al-checkbox
  :value="[1]"
  :options="[{ value: 1, text: '西瓜', disabled: false }]"
/>
<al-checkbox
  :value="[1, 3]"
  :options="[
    { value: 1, text: '西瓜', disabled: false },
    { value: 2, text: '草莓', disabled: false },
    { value: 3, text: '香蕉', disabled: true }
  ]"
/>
```
</docs>
