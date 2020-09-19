<template>
  <el-select
    v-bind:class="classList"
    v-bind:style="styleMap"
    v-show="!hidden"
    v-model="defaultValue"
    @change="onChange"
    @clear="onClear"
    @blur="onBlur"
    @focus="onFocus"
    :multiple="multiple"
    :collapse-tags="collapseTags"
    :multiple-limit="multipleLimit"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="clearable"
    :loading="loading"
    class="al-select"
  >
    <el-option-group
      v-for="(group, index) in groupOptions"
      :key="index"
      :label="group.name"
    >
      <el-option
        v-for="(item, index) in group.options"
        :key="index"
        :label="item.text"
        :value="item.value"
        :disabled="item.disabled"
      >
      </el-option>
    </el-option-group>
    <el-option
      v-for="(item, index) in nonGroupOptions"
      :key="index"
      :label="item.text"
      :value="item.value"
      :disabled="item.disabled"
    ></el-option>
  </el-select>
</template>

<script>
import baseMixin from '../../mixins/base'
/**
 * 选择器
 * @displayName Al Select
 */
export default {
  name: 'al-select',
  mixins: [baseMixin],
  props: {
    /**
     * 默认值
     * @values string / array
     */
    value: {
      type: [String, Array]
    },
    /**
     * 多选
     * @values true / false
     */
    multiple: {
      type: Boolean,
      default: false
    },
    /**
     * 多选是否按文字形式展示
     * @values true / false
     */
    collapseTags: {
      type: Boolean,
      default: false
    },
    /**
     * 多选最大项目数限制
     * @value number
     */
    multipleLimit: {
      type: Number,
      default: 0
    },
    /**
     * 占位符
     * @values string
     */
    placeholder: {
      type: String
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
     * 加载状态
     * @values true / false
     */
    loading: {
      type: Boolean
    },
    /**
     * 选项值
     * @value array
     */
    options: {
      type: Array,
      default: () => []
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
  data () {
    return {
      defaultValue: '',
      groupOptions: [],
      nonGroupOptions: []
    }
  },
  watch: {
    options: {
      immediate: true,
      handler (options) {
        this.optionsGroup(options)
      }
    },
    value: {
      immediate: true,
      handler (val) {
        this.defaultValue = val
      }
    }
  },
  methods: {
    optionsGroup (options) {
      const result = []

      this.nonGroupOptions = []
      options.forEach(option => {
        const index = result.findIndex(obj => obj.name === option.group)

        if (index !== -1) {
          result[index].options.push(option)
        } else if (option.group) {
          result.push({
            name: option.group,
            options: [option]
          })
        } else if (!option.group) {
          this.nonGroupOptions.push(option)
        }
      })
      this.groupOptions = result
    },
    onChange (e) {
    /**
     * 选择事件
     * @event change
     * @type {Event}
     */
      this.$emit('change', e)
    },
    onClear (e) {
    /**
     * 清除事件
     * @event clear
     * @type {Event}
     */
      this.$emit('clear', e)
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
    selectionVisible () {
      // Todo
    },
    selectionHidden () {
      // Todo
    }
  }
}
</script>

<style lang="scss" scoped>
.al-select {
  width: 100%;
}
</style>

<docs>

## 演示

选择器
```jsx
<al-select
  :options="[{
    value: '选项1',
    text: '黄金糕',
    disabled: false,
  }, {
    value: '选项2',
    text: '蟹黄汤包',
    disabled: false,
  }, {
    value: '选项3',
    text: '叉烧包',
    disabled: false,
  }]"
></al-select>
```

分类选择器

```jsx
<al-select :options="[{
    value: '选项1',
    text: '黄金糕',
    disabled: false,
    group: '点心'
  }, {
    value: '选项2',
    text: '双皮奶',
    disabled: false,
    group: '点心'
  }, {
    value: '选项3',
    text: '蚵仔煎',
    disabled: false,
    group: '点心'
  }, {
    value: '选项4',
    text: '龙须面',
    disabled: false,
    group: '点心'
  }, {
    value: '选项5',
    text: '北京烤鸭',
    disabled: false,
    group: '硬菜'
  }]"></al-select>
```

默认值
```jsx
<al-select
  :options="[{
    value: '选项1',
    text: '黄金糕',
    disabled: false,
  }, {
    value: '选项2',
    text: '蟹黄汤包',
    disabled: false,
  }, {
    value: '选项3',
    text: '叉烧包',
    disabled: false,
  }]"
  value="选项1"
></al-select>
<al-select
  :options="[{
  value: '选项1',
  text: '黄金糕',
  disabled: false,
}, {
  value: '选项2',
  text: '蟹黄汤包',
  disabled: false,
}, {
  value: '选项3',
  text: '叉烧包',
  disabled: false,
}]"
  :value="['选项1', '选项2']"
  :multiple="true"
></al-select>
```

占位符
```jsx
<al-select
  :options="[{
    value: '选项1',
    text: '黄金糕',
    disabled: false,
  }, {
    value: '选项2',
    text: '蟹黄汤包',
    disabled: false,
  }, {
    value: '选项3',
    text: '叉烧包',
    disabled: false,
  }]"
  placeholder="这是占位符"
></al-select>
```

多选
```jsx
<al-select
  :options="[{
    value: '选项1',
    text: '黄金糕',
    disabled: false,
  }, {
    value: '选项2',
    text: '蟹黄汤包',
    disabled: false,
  }, {
    value: '选项3',
    text: '叉烧包',
    disabled: false,
  }]"
  :multiple="true"
></al-select>
```

多选是否以文字展示
```jsx
<al-select
  :options="[{
    value: '选项1',
    text: '黄金糕',
    disabled: false,
  }, {
    value: '选项2',
    text: '蟹黄汤包',
    disabled: false,
  }, {
    value: '选项3',
    text: '叉烧包',
    disabled: false,
  }]"
  :multiple="true"
  :collapse-tags="true"
></al-select>
```

多选最大项目数
```jsx
<al-select
  :options="[{
    value: '选项1',
    text: '黄金糕',
    disabled: false,
  }, {
    value: '选项2',
    text: '蟹黄汤包',
    disabled: false,
  }, {
    value: '选项3',
    text: '叉烧包',
    disabled: false,
  }]"
  :multiple="true"
  :multiple-limit="2"
></al-select>
```

禁用
```jsx
<al-select
  :options="[{
    value: '选项1',
    text: '黄金糕',
    disabled: false,
  }, {
    value: '选项2',
    text: '蟹黄汤包',
    disabled: false,
  }, {
    value: '选项3',
    text: '叉烧包',
    disabled: false,
  }]"
  :disabled="true"
></al-select>
```

清除
```jsx
<al-select
  :options="[{
    value: '选项1',
    text: '黄金糕',
    disabled: false,
  }, {
    value: '选项2',
    text: '蟹黄汤包',
    disabled: false,
  }, {
    value: '选项3',
    text: '叉烧包',
    disabled: false,
  }]"
  :clearable="true"
></al-select>
```

加载中
```jsx
<al-select
  :options="[{
    value: '选项1',
    text: '黄金糕',
    disabled: false,
  }, {
    value: '选项2',
    text: '蟹黄汤包',
    disabled: false,
  }, {
    value: '选项3',
    text: '叉烧包',
    disabled: false,
  }]"
  :loading="true"
></al-select>
```
</docs>
