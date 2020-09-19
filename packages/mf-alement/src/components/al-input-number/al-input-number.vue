<template>
  <el-input-number
    v-model="num"
    v-show="!hide"
    v-bind:class="classList"
    v-bind:style="styleMap"
    :placeholder="placeholder"
    :disabled="disabled"
    :min="min"
    :max="max"
    :step="step"
    :step-strictly="stepStrictly"
    :precision="precision"
    :label="label"
    :label-position = "labelPosition"
    :label-width="labelWidth"
    @change="onChange"
    @blur="onBlur"
    @focus="onFocus"
    class="al-input-number"
    >
    </el-input-number>
</template>
<script>
import baseMixin from '../../mixins/base'
/**
 * input数字输入框
 * @displayName Al Input Number
 */
export default {
  name: 'al-input-number',
  mixins: [baseMixin],
  props: {
    /**
     * 默认值
     * @value Number
     */
    value: {
      type: Number
    },
    /**
     * 输入框默认 placeholder
     * @value string
     */
    placeholder: {
      type: String
    },
    /**
     * 最小值
     * @value Number
     */
    min: {
      type: Number
    },
    /**
     * 最大值
     * @value Number
     */
    max: {
      type: Number
    },
    /**
     * 步数 允许定义递增递减的步数控制
     * @value number
     */
    step: {
      type: Number
    },
    /**
     * 是否只能输入 step 的倍数
     * @values true / false
     */
    stepStrictly: {
      type: Boolean,
      default: true
    },
    /**
     * 精度
     * @value number
     */
    precision: {
      type: Number
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
     * 视觉上的隐藏
     * @values true / false
     */
    hide: {
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
      type: String,
      default: 'left'
    },
    /**
     * 输入框关联文字宽度
     * @value string
     */
    labelWidth: {
      type: String
    }
  },
  data () {
    return {
      num: ''
    }
  },
  watch: {
    value: {
      handler (val) {
        this.num = val
      },
      immediate: true
    }
  },
  methods: {
    onChange (e) {
    /**
     * 点击改变事件
     * @event change
     * @type {Event}
     */
      this.$emit('change', e)
    },
    onFocus (e) {
    /**
     * 获得焦点时触发
     * @event focus
     * @type {Event}
     */
      this.$emit('focus', e)
    },
    onBlur (e) {
    /**
     * 失去焦点时触发
     * @event blur
     * @type {Event}
     */
      this.$emit('blur', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.al-input-number {
  width: 100%;
}
</style>

<docs>

## 演示

默认状态

```jsx
<al-input-number :value="1" ></al-input-number>
```

占位符

```jsx
<al-input-number placeholder="1" />
```

输入值最大最小状态

```jsx
<al-input-number :min="1" :max="6" :value="1" ></al-input-number>
```

允许定义递增递减的步数控制

```jsx
<al-input-number :step="1" :value="1" ></al-input-number>
```

允许定义递增递减的步数精度控制

```jsx
<al-input-number :precision="2" :step="0.1" :value="1" ></al-input-number>
```

严格步数

```jsx
<al-input-number :step="1" :step-strictly="true" :value="1" ></al-input-number>
```

禁用状态

```jsx
<al-input-number :disabled="true" :value="1" ></al-input-number>
```

</docs>
