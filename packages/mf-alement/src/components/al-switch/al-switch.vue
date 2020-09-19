<template>
  <el-switch
    v-bind:class="classList"
    v-bind:style="styleMap"
    v-model="switchValue"
    :disabled="disabled"
    v-show="!hide"
    @change="onChange"
    :width="width"
    :label="label"
    :label-position = "labelPosition"
    :label-width = "labelWidth"
  >
  </el-switch>
</template>
<script>
import baseMixin from '../../mixins/base'
/**
 * 开关
 * @displayName Al Switch
 */
export default {
  name: 'al-switch',
  mixins: [baseMixin],
  props: {
    /**
     * 默认值
     * @values boolean / object
     */
    value: {
      type: Boolean,
      default: true
    },
    /**
     * switch 的宽度
     * @value number
     */
    width: {
      type: Number,
      default: 40
    },
    /**
     * label
     * @value string
     */
    label: {
      type: String
    },
    /**
     * label的宽度
     * @value number
     */
    labelWidth: {
      type: Number
    },
    /**
     * label的位置
     * @values top / left
     */
    labelPosition: {
      type: String,
      default: 'left'
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
    }
  },
  data () {
    return {
      switchValue: ''
    }
  },
  watch: {
    value: {
      handler (val) {
        this.switchValue = val
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
    }
  }
}
</script>

<docs>

## 演示

默认状态

```jsx
<al-switch :value="true"></al-switch>
```

禁用状态

```jsx
<al-switch :disabled="true"  ></al-switch>
<al-switch :disabled="true" ></al-switch>
```
设置width

```jsx
<al-switch :width="40" ></al-switch>
```

</docs>
