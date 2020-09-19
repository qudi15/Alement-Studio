<template>
  <el-date-picker
    v-bind:class="classList"
    v-bind:style="styleMap"
    v-model="comValue"
    v-show="!hidden"
    @change="onChange"
    @blur="onBlur"
    @focus="onFocus"
    :type="type"
    :value-format="valueFormat"
    :placeholder="singlePlaceholder"
    :start-placeholder="rangeStartPlaceholder"
    :end-placeholder="rangeEndPlaceholder"
    :readonly="readonly"
    :disabled="disabled"
    :clearable="clearable"
    :default-time="defaultTime"
    :picker-options="pickerOptions"
    class="al-date"
  >
  </el-date-picker>
</template>

<script>
import baseMixin from '../../mixins/base'
/**
 * 日期
 * @displayName Al Date
 */
export default {
  name: 'al-date',
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
     * 日期格式
     * @value string
     */
    valueFormat: {
      type: String
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
     * @values string / array
     */
    value: {
      type: [String, Array, Date]
    },
    /**
     * 类型
     * @value string
     */
    type: {
      type: String,
      default: 'date'
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
     * 禁选日期函数
     * @value function
     */
    disabledDate: {
      type: Function
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
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.comValue = val
        this.setDefaultTime(val)
      }
    }
  },
  data () {
    return {
      defaultTime: '',
      comValue: '',
      singlePlaceholder: '',
      rangeStartPlaceholder: '',
      rangeEndPlaceholder: '',
      pickerOptions: {}
    }
  },
  mounted () {
    // 设置禁选日期函数
    this.$set(this.pickerOptions, 'disabledDate', this.disabledDate)
    // 设置默认时间
    this.setDefaultTime(this.value)
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
      } else if (Array.isArray(placeholder) && placeholder.length > 0) {
        this.rangeStartPlaceholder = placeholder[0] && placeholder[0].length ? placeholder[0] : ''
        this.rangeEndPlaceholder = placeholder[1] && placeholder[1].length ? placeholder[1] : ''
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
    }
  }
}
</script>

<style lang="scss" scoped>
.al-date.el-date-editor.el-input {
  width: 100%;
}
</style>

<docs>

## 演示

类型
```jsx
<span style="width: 150px; display: inline-block;">Year:</span>
  <al-date type="year"/>
<br/>
<span style="width: 150px; display: inline-block;">Month:</span>
  <al-date type="month"/>
<br/>
<span style="width: 150px; display: inline-block;">Date:</span>
  <al-date type="date"/>
<br/>
<span style="width: 150px; display: inline-block;">Dates:</span>
  <al-date type="dates"/>
<br/>
<span style="width: 150px; display: inline-block;">Week:</span>
  <al-date type="week"/>
<br/>
<span style="width: 150px; display: inline-block;">Datetime:</span>
  <al-date type="datetime"/>
<br/>
<span style="width: 150px; display: inline-block;">Datetime range:</span>
  <al-date type="datetimerange"/>
<br/>
<span style="width: 150px; display: inline-block;">Date range:</span>
  <al-date type="daterange"/>
<br/>
<span style="width: 150px; display: inline-block;">Month range</span>
  <al-date type="monthrange"/>
<br/>
```

默认时间
```jsx
<al-date value="2020-08-22" type="date" />
<al-date :value="[new Date(), new Date()]" type="daterange" />
```

占位符
```jsx
<al-date placeholder="请选择" type="date" />
<al-date :placeholder="['请选择起始时间', '请选择截止时间']" type="daterange" />
```

禁选日期函数
```jsx
<al-date placeholder="请选择" type="date" :disabled-date="currentDate => currentDate < new Date('2020-08-20')"/>
```

日期格式
```vue
<template>
  <div>
    <div>在console里面查看时间值</div>
    <al-date placeholder="请选择" type="date" value-format="yyyy-mm-dd hh:mm" @change="onChange"/>
  </div>
</template>
<script>
  export default {
    methods: {
      onChange (e) {
        console.log(`value:${e}`, )
      }
    }
  }
</script>
```
</docs>
