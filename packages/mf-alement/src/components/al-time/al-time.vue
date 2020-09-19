<template>
  <el-time-select
    v-if="isSelect"
    v-bind:class="classList"
    v-bind:style="styleMap"
    v-model="defaultTime"
    v-show="!hide"
    @change="onChange"
    @blur="onBlur"
    @focus="onFocus"
    @clear="onClear"
    :placeholder="singlePlaceholder"
    :readonly="readonly"
    :disabled="disabled"
    :clearable="clearable"
    :picker-options="pickerOptions"
  >
  </el-time-select>
  <el-time-picker
    v-else
    v-bind:class="classList"
    v-bind:style="styleMap"
    v-model="defaultTime"
    v-show="!hide"
    @change="onChange"
    @blur="onBlur"
    @focus="onFocus"
    @clear="onClear"
    :placeholder="singlePlaceholder"
    :start-placeholder="rangeStartPlaceholder"
    :end-placeholder="rangeEndPlaceholder"
    :readonly="readonly"
    :disabled="disabled"
    :clearable="clearable"
    :is-range="isRange"
    :picker-options="pickerOptions"
  ></el-time-picker>
</template>

<script>
import baseMixin from '../../mixins/base'
/**
 * 时间选择器
 * @displayName Al Time
 */
export default {
  name: 'al-time',
  mixins: [baseMixin],
  props: {
    /**
     * 格式化
     * @value function
     */
    format: {
      type: Function
    },
    /**
     * 解析
     * @value function
     */
    parse: {
      type: Function
    },
    /**
     * 默认值
     * @values string / array / date
     */
    value: {
      type: [String, Array, Date]
    },
    /**
     * 占位符
     * @values string / array
     */
    placeholder: {
      type: [String, Array]
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
     * 禁用状态
     * @values true / false
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * 是否可清空
     * @values true / false
     */
    clearable: {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启Select模式
     * @values true / false
     */
    isSelect: {
      type: Boolean,
      default: false
    },
    /**
     * 是否开启范围选择
     *  @values true / false
     */
    isRange: {
      type: Boolean,
      default: false
    },
    /**
     * 最小时间
     * @value string
     */
    minTime: {
      type: String
    },
    /**
     * 时间步进值
     * @value string
     */
    step: {
      type: String
    },
    /**
     * 最大时间
     * @value string
     */
    maxTime: {
      type: String
    },
    /**
     * 可选日期范围
     * @values string / array
     */
    selectableRange: {
      type: [String, Array]
    },
    /**
     * 自定义校验规则
     * @value array
     */
    rules: {
      type: Array
    },
    /**
     * 关联文字
     * @value string
     */
    label: {
      type: String
    },
    /**
     * 关联文字位置
     * @values top / left
     */
    labelPosition: {
      type: String
    },
    /**
     * 关联文字宽度
     * @value string
     */
    labelWidth: {
      type: String
    }
  },
  data () {
    return {
      defaultTime: '',
      singlePlaceholder: '',
      rangeStartPlaceholder: '',
      rangeEndPlaceholder: '',
      pickerOptions: {}
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.setDefaultTime(val)
      }
    },
    selectableRange: {
      immediate: true,
      handler (selectableRange) {
        this.setLimitTime(this.isSelect, selectableRange)
      }
    }
  },
  created () {
    // 设置占位符
    this.setPlaceHolder(this.placeholder)
  },
  methods: {
    setDefaultTime (defaultValue) {
      if ((typeof defaultValue).toLowerCase() === 'string') {
        this.defaultTime = new Date(defaultValue)
      } else if (Array.isArray(defaultValue)) {
        this.defaultTime = defaultValue.map(v => new Date(v))
      }
    },
    setPlaceHolder (placeholder) {
      if ((typeof placeholder).toLowerCase() === 'string') {
        this.singlePlaceholder = placeholder
      } else if (Array.isArray(placeholder)) {
        this.rangeStartPlaceholder = placeholder[0] && placeholder[0].length ? placeholder[0] : ''
        this.rangeEndPlaceholder = placeholder[1] && placeholder[1].length ? placeholder[1] : ''
      }
    },
    setLimitTime (isSelect, selectableRange) {
      if (!isSelect && selectableRange) {
        this.$set(this.pickerOptions, 'selectableRange', selectableRange)
      } else if (isSelect) {
        this.$set(this.pickerOptions, 'minTime', this.minTime)
        this.$set(this.pickerOptions, 'maxTime', this.maxTime)
        this.$set(this.pickerOptions, 'step', this.step)
      }
    },
    onChange (e) {
    /**
     * 变更日期事件
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
    },
    onFocus (e) {
    /**
     * 获取焦点事件
     * @event focus
     * @type {Event}
     */
      this.$emit('focus', e)
    },
    onClear (e) {
    /**
     * 清除事件
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

默认时间
```jsx
<al-time :value="new Date()" :is-select="false" :is-range="false"></al-time>
<al-time :value="['2020-09-20 08:40:00', '2020-09-20 09:40:00']" :is-range="true" />
```

占位符
```jsx
<al-time placeholder="请选择" :is-select="true" />
<al-time placeholder="请选择" />
<al-time :placeholder="['请选择起始时间', '请选择截止时间']" :is-range="true" />
```

设置可选日期范围
```jsx
<al-time :is-select="true" min-time="09:40" max-time="12:40" step="00:10"/>
<al-time selectable-range="09:30:00 - 12:00:00" />
```
</docs>
