<template>
  <el-form
    ref="el-form"
    :model="model"
    :id="id"
    :name="name"
    :disabled="disabled"
    :class="classList"
    :style="styleMap"
    :labelWidth="labelWidth"
    :labelPosition="labelPosition"
    v-loading="loading"
    class="al-form"
  >
    <el-row>
      <template v-for="(field, index) in fields">
        <el-col v-if="isShow(field)" :key="index" :span="getAttr(field, 'width', 8)">
          <el-form-item
            :label="$t(getAttr(field, 'label', ''))"
            :label-width="getAttr(field, 'labelWidth', labelWidth)"
            :prop="getAttr(field, 'primaryKey')"
            :rules="getRules(getAttr(field, 'rules'))"
          >
            <!-- 文本类型 -->
            <al-text
              v-if="isType(field, 'text')"
              :text="getValue(field)"
              :classList="field.classList" :styleMap="field.styleMap"
            />

            <!-- 文本框 -->
            <al-input
              v-if="isType(field, 'input')"
              :type="getAttr(field, 'nativeType', 'text')"
              :placeholder="getAttr(field, 'placeholder', '')"
              :maxLength="getAttr(field, 'maxLength')"
              :disabled="isDisabled(field)"
              :value="getValue(field)"
              :classList="field.classList" :styleMap="field.styleMap"
              :readonly="isReadonly(field)"
              @input="onValueChange($event, field)"
              @onBlur="onFieldBlur($event, field)"
              :clearable="getAttr(field, 'clearable', true)"
            />

            <!-- 多行文本框 -->
            <al-input
              v-if="isType(field, 'textarea')"
              type="textarea"
              :placeholder="getAttr(field, 'placeholder', '')"
              :disabled="isDisabled(field)"
              :clearable="getAttr(field, 'clearable', true)"
              :classList="field.classList" :styleMap="field.styleMap"
              :readonly="isReadonly(field)"
              :value="getValue(field)"
              @input="onValueChange($event, field)"
            />

            <!-- 下拉框 -->
            <al-select
              v-if="isType(field, ['select', 'valueset'])"
              :placeholder="getAttr(field, 'placeholder', '')"
              :classList="field.classList" :styleMap="field.styleMap"
              :disabled="isDisabled(field)"
              :options="getAttr(field, 'options', [])"
              :clearable="getAttr(field, 'clearable', true)"
              :readonly="isReadonly(field)"
              :value="getValue(field)"
              @change="onValueChange($event, field)"
              :multiple="getAttr(field, 'mode') === 'multiple'"
            />

            <!-- 日期 -->
            <al-date
              v-if="isType(field, 'date')"
              :type="getAttr(field, 'nativeType', 'date')"
              :value-format="getAttr(field, 'valueFormat')"
              :placeholder="getAttr(field, 'placeholder', '')"
              :disabledDate="getAttr(field, 'disabledDate')"
              :disabled="isDisabled(field)"
              :clearable="getAttr(field, 'clearable', true)"
              :classList="field.classList" :styleMap="field.styleMap"
              :readonly="isReadonly(field)"
              :value="getValue(field)"
              @change="onValueChange($event, field)"
            />

            <!-- 时间 -->
            <al-time
              v-if="isType(field, 'time')"
              :placeholder="getAttr(field, 'placeholder', '')"
              :disabled="isDisabled(field)"
              :clearable="getAttr(field, 'clearable', true)"
              :classList="field.classList" :styleMap="field.styleMap"
              :readonly="isReadonly(field)"
              :value="getValue(field)"
              @change="onValueChange($event, field)"
            />

            <!-- 开关 -->
            <al-switch
              v-if="isType(field, 'switch')"
              :placeholder="getAttr(field, 'placeholder', '')"
              :disabled="isDisabled(field)"
              :clearable="getAttr(field, 'clearable', true)"
              :classList="field.classList" :styleMap="field.styleMap"
              :readonly="isReadonly(field)"
              :value="getValue(field)"
              @change="onValueChange($event, field)"
            />

            <!-- 复选框 -->
            <al-checkbox
              v-if="isType(field, 'checkbox')"
              :placeholder="getAttr(field, 'placeholder', '')"
              :disabled="isDisabled(field)"
              :options="getAttr(field, 'options', [])"
              :classList="field.classList" :styleMap="field.styleMap"
              :readonly="isReadonly(field)"
              :value="getValue(field)"
              @change="onValueChange($event, field)"
            />

            <!-- 单选框 -->
            <al-radio
              v-if="isType(field, 'radio')"
              :placeholder="getAttr(field, 'placeholder', '')"
              :disabled="isDisabled(field)"
              :options="getAttr(field, 'options', [])"
              :classList="field.classList" :styleMap="field.styleMap"
              :readonly="isReadonly(field)"
              :value="getValue(field)"
              @change="onValueChange($event, field)"
            />

            <!-- 数值输入框 -->
            <al-input-number
              v-if="isType(field, 'number')"
              :placeholder="getAttr(field, 'placeholder', '')"
              :disabled="isDisabled(field)"
              :min="getAttr(field, 'min')"
              :max="getAttr(field, 'max')"
              :precision="getAttr(field, 'precision')"
              :classList="field.classList" :styleMap="field.styleMap"
              :readonly="isReadonly(field)"
              :value="getValue(field)"
              :step="getAttr(field, 'step')"
              @change="onValueChange($event, field)"
            />

            <!-- 弹窗查询输入框 -->
            <al-input-modal-search
              v-if="isType(field, 'search')"
              :placeholder="getAttr(field, 'placeholder', '')"
              v-bind="getAttr(field, 'attrs', {})"
              :classList="field.classList" :styleMap="field.styleMap"
              :disabled="isDisabled(field)"
              :value="getValue(field)"
              :model="model"
              @change="onValueChange($event, field)"
            />

            <!-- 按钮 -->
            <al-button
              v-if="isType(field, 'button')"
              :text="getAttr(field, 'text')"
              :type="getAttr(field, 'nativeType')"
              :icon="getAttr(field, 'icon')"
              :size="getAttr(field, 'size')"
              :disabled="isDisabled(field)"
              @click="onEvent($event, field, 'onClick')"
              :classList="field.classList" :styleMap="field.styleMap"
            />

            <!-- 富文本编辑器 -->
            <al-rich-text-editor
              v-if="isType(field, 'richtext')"
              :value="getValue(field)"
              :disabled="isDisabled(field)"
              @onChange="onValueChange($event, field)"
              @onBlur="onFieldBlur($event, field)"
              :classList="field.classList" :styleMap="field.styleMap"
            />
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script>
import alButton from '../al-button/al-button'
import alSwitch from '../al-switch/al-switch'
import alCheckbox from '../al-checkbox/al-checkbox'
import alInput from '../al-input/al-input'
import alInputNumber from '../al-input-number/al-input-number'
// import alTable from '../al-table/al-table'
import alText from '../al-text/al-text'
import alRadio from '../al-radio/al-radio'
import alDate from '../al-date/al-date'
// import alIcon from '../al-icon/al-icon'
import alSelect from '../al-select/al-select'
import alTime from '../al-time/al-time'
// import alLayout from '../al-layout/al-layout'
import alInputModalSearch from '../al-input-modal-search/al-input-modal-search'

import validationMixin from '../../mixins/validation'
import containerMixin from '../../mixins/container'
import { alGetterCoolPath, alSetterCoolPath } from '../../utils'
/**
 * 表单
 * @displayName Al Form
 */
export default {
  name: 'al-form',

  inject: [
    'registerValidationComponent',
    'unregisterValidationComponent'
  ],

  components: {
    alInput,
    alText,
    alSelect,
    alDate,
    alSwitch,
    alCheckbox,
    alRadio,
    alInputNumber,
    alTime,
    alInputModalSearch,
    alButton
  },

  mixins: [
    containerMixin,
    validationMixin
  ],

  props: {
    /**
     * 表单绑定的值
     */
    model: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    },
    /**
     * 表单额外需要的值 使用者自己传
     */
    extra: {
      type: Object
    },
    /**
     * 表单label的宽度
     * @values '200px'
     */
    labelWidth: {
      type: String,
      default: '100px'
    },
    /**
     * 表单label的位置（top labelWidth不生效，left和right lebel和表单控件在同一行 区别是label文字左对齐右对齐）
     * @values top/left/right
     */
    labelPosition: {
      type: String,
      default: 'right'
    },
    /**
     * 表单控件的置灰属性 如果表单置灰了 会控制表单下的所有控件都置灰
     * @values true false
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * 表单控件的只读属性 如果表单只读了 会控制表单下的所有控件都只读
     * @values true false
     */
    readonly: {
      type: Boolean,
      default: false
    },
    /**
     * 表单的loading状态 loading状态不可操作表单数据
     * @values true false
     */
    loading: {
      type: Boolean,
      default: false
    },

    /**
     * 表单中的字段
     */
    fields: {
      type: Array,
      default () {
        return []
      }
    }
  },

  created () {
    /**
     * 将子组件注册在场景组件中，用于validation等功能
     */
    if (typeof this.registerValidationComponent === 'function') {
      this.registerValidationComponent(this)
    }
  },

  destroyed () {
    if (typeof this.unregisterValidationComponent === 'function') {
      this.unregisterValidationComponent(this)
    }
  },

  methods: {

    /**
     * @private
     */
    isShow (field = {}) {
      const hide = field.hide
      if (typeof hide === 'boolean') {
        return !hide
      }
      if (typeof hide === 'function') {
        return !hide(this.model, this.extra)
      }
      return true
    },

    /**
     * 获取events中的事件
     * @private
     */
    getEvent (field = {}, name = '') {
      return (field.events || {})[name]
    },

    onEvent (event, field = {}, name) {
      const schemaEvent = this.getEvent(field, name)
      if (typeof schemaEvent === 'function') {
        schemaEvent(event, this.model, this.extra)
      }
    },

    /**
     * 判断字段的配型
     * @private
     * @returns boolean
     */
    isType (field = {}, expectedType = '') {
      const expectedTypes = Array.isArray(expectedType) ? expectedType : [expectedType]
      const type = this.getAttr(field, 'type')
      if (expectedTypes.includes(type)) {
        return true
      }
      if (typeof type === 'function') {
        return expectedTypes.includes(type(this.model, this.extra))
      }
      return false
    },

    /**
     * 判断字段是否禁用
     * @private
     */
    isDisabled (field = {}) {
      if (this.disabled) {
        return true
      }
      const disabled = this.getAttr(field, 'disabled')
      if (typeof disabled === 'boolean') {
        return disabled
      }
      if (typeof disabled === 'function') {
        return disabled(this.model, this.extra)
      }
      return false
    },

    /**
     * 判断字段是否只读
     * @private
     */
    isReadonly (field = {}) {
      if (this.readonly) {
        return true
      }
      const readonly = this.getAttr(field, 'readonly')
      if (typeof readonly === 'boolean') {
        return readonly
      }
      if (typeof readonly === 'function') {
        return readonly(this.model, this.extra)
      }
      return false
    },

    /**
     * 获取字段的值
     * @private
     */
    getValue (field = {}) {
      const key = this.getAttr(field, 'primaryKey')
      const format = this.getAttr(field, 'format')

      // 处理查询条件中primaryKey中带有.但不需要嵌套赋值的问题
      const noNestedKey = this.getAttr(field, 'noNestedKey')
      const val = noNestedKey
        ? this.model[key]
        : key
          ? alGetterCoolPath(this.model, key)
          : this.model

      if (typeof format === 'function') {
        return format(val, this.model, this.extra)
      }
      return val
    },

    /**
     * 当字段值发生变化时
     * @private
     */
    onValueChange (event, field = {}) {
      const key = this.getAttr(field, 'primaryKey')
      if (!key) {
        return
      }
      const parse = this.getAttr(field, 'parse')
      const val =
        typeof parse === 'function'
          ? parse(event, this.model, this.extra)
          : event

      // 处理查询条件中primaryKey中带有.但不需要嵌套赋值的问题
      const noNestedKey = this.getAttr(field, 'noNestedKey')
      if (noNestedKey) {
        this.model[key] = val
      } else {
        alSetterCoolPath(this.model, key, val)
      }

      const schemaEvent = this.getEvent(field, 'onChange')
      if (typeof schemaEvent === 'function') {
        schemaEvent(val, this.model, this.extra)
      }
    },

    /**
     * 当filed触发blur事件时
     * @private
     */
    onFieldBlur (event, field = {}) {
      const schemaEvent = this.getEvent(field, 'onBlur')
      if (typeof schemaEvent === 'function') {
        schemaEvent(event, this.model, this.extra)
      }
    },

    /**
     * 校验事件
     * @returns {Promise}
     * @public
     */
    validate () {
      return new Promise((resolve, reject) => {
        this.$refs['el-form'].validate(validateResult => {
          resolve(validateResult)
        })
      })
    },
    /**
     * 重置事件
     * @param {void}
     * @return {void}
     * @public
     */
    reset () {
      this.fields.forEach(field => {
        alSetterCoolPath(this.model, field.attrs.primaryKey, null)
      })
      // this.events.reset && this.events.reset(this.model, this.extra)
    },

    submit () {
      // let beforeSubmitFlag = true
      // if (this.hooks.beforeSubmit) {
      //   beforeSubmitFlag = this.hooks.beforeSubmit(this.model, this.extra)
      // }
      // if (beforeSubmitFlag) {
      //   this.events.submit && this.events.submit(this.model, this.extra)
      //   this.hooks.afterSubmit && this.hooks.afterSubmit(this.model, this.extra)
      // }
    },
    // getValue (model = {}, keyPath = '') {
    //   return keyPath ? alGetterCoolPath(model, keyPath) : model
    // },

    getRules (rules = []) {
      return rules.map(rule => {
        if (typeof rule.validator === 'function') {
          return {
            ...rule,
            validator: (fieldRule, value, cb) => {
              rule.validator(value, this.model, cb, this.extra)
            }
          }
        } else {
          return rule
        }
      })
    },

    alFormControlChange (model, keyPath, value) {
      if (keyPath) {
        alSetterCoolPath(model, keyPath, value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<docs>

类型展示

```vue
<template>
  <AlForm :model="model" :fields="fields" />
</template>
<script>
export default {
  data() {
    return {
      model: {
        input: "输入框",
        text: "文本",
        select: '',
        selectMuti: [],
        date: new Date,
        daterange: [new Date, new Date],
        time: new Date,
        switch: false,
        checkbox: [],
        radio: '',
        number: 1,
        richtext: 'Hello world'
      },
      fields: [
        {
          attrs: {
            label: "文本",
            type: "text",
            primaryKey: "text"
          }
        },
        {
          attrs: {
            label: "输入框",
            type: "input",
            primaryKey: "input"
          }
        },
        {
          attrs: {
            label: "密码输入框",
            type: "input",
            primaryKey: "input",
            nativeType: "password"
          }
        },
        {
          attrs: {
            label: "下拉选项",
            type: "select",
            primaryKey: "select",
            options: [{ text: "选项1", value: 1 }]
          }
        },
        {
          attrs: {
            label: "下拉多选",
            type: "select",
            primaryKey: "selectMuti",
            mode: "multiple",
            options: [
              { text: "选项1", value: 1 },
              { text: "选项2", value: 2 }
            ]
          }
        },
        {
          attrs: {
            label: "日期",
            type: "date",
            primaryKey: "date"
          }
        },
        {
          attrs: {
            label: "时间",
            type: "time",
            primaryKey: "time"
          }
        },
        {
          attrs: {
            label: "开关",
            type: "switch",
            primaryKey: "switch"
          }
        },
        {
          attrs: {
            label: "复选框",
            type: "checkbox",
            primaryKey: "checkbox",
            options: [
              { text: "选项1", value: 1 },
              { text: "选项2", value: 2 }
            ]
          }
        },
        {
          attrs: {
            label: "单选",
            type: "radio",
            primaryKey: "radio",
            options: [
              { text: "选项1", value: '1' },
              { text: "选项2", value: '2' }
            ]
          }
        },
        {
          attrs: {
            label: "数值",
            type: "number",
            primaryKey: "number"
          }
        },
        {
          attrs: {
            label: "查询弹窗",
            type: "search",
            primaryKey: "search",
            attrs: {
              format: 'name',
              searchOrders: [
                { fieldName: 'createTime', order: 'desc' }
              ],
              searchApi: '/api/authority-role/search',
              countApi: '/api/authority-role/count',
              fields: [
                { label: '文本框', primaryKey: 'code', conditionOperator: 'like' },
                { label: '锁定', primaryKey: 'name', conditionOperator: 'like', fixed: true }
              ],
              columns: [
                { label: '请选择', type: 'singleSelection' },
                { label: '编码', primaryKey: 'code' },
                { label: '名称', primaryKey: 'name' }
              ]
            }
          }
        },
        {
          attrs: {
            type: 'button',
            text: '按钮'
          }
        },
        {
          attrs: {
            label: "日期范围",
            type: "date",
            nativeType: 'daterange',
            primaryKey: "daterange"
          }
        },
        {
          attrs: {
            width: 24,
            primaryKey: 'richtext',
            type: 'richtext',
            label: '富文本编辑器'
          }
        }
      ]
    };
  }
};
</script>

```

动态属性

```vue
<template>
  <AlForm :model="model" :fields="fields" />
</template>
<script>
export default {
  data() {
    return {
      model: {
        type: 'input',
        disabled: false,
        readonly: false,
        hide: false,
        text: ''
      },
      fields: [
        {
          attrs: {
            label: "类型",
            type: "select",
            primaryKey: "type",
            options: [
              { text: "输入框", value: 'input' },
              { text: "日期", value: 'date' },
              { text: "开关", value: 'switch' },
              { text: "富文本", value: 'richtext' },
            ]
          }
        },
        {
          attrs: {
            label: "禁用",
            type: "switch",
            primaryKey: "disabled"
          }
        },
        {
          attrs: {
            label: "隐藏",
            type: "switch",
            primaryKey: "hide"
          }
        },
        {
          hide: (model) => model.hide,
          attrs: {
            label: "动态类型",
            width: 24,
            type: model => model.type,
            disabled: model => model.disabled,
            primaryKey: "text"
          }
        }
      ]
    };
  }
};
</script>

```

将表单分成多个部分, 并添加标题

```vue
<template>
  <AlForm :model="model" :fields="fields" />
</template>
<script>
export default {
  data() {
    return {
      model: {
        type: 'input',
        disabled: false,
        readonly: false,
        hide: false,
        text: '',
        title1: '标题1',
        title2: '标题2',
      },
      fields: [
        {
          attrs: {
            label: '',
            type: 'text',
            primaryKey: 'title1',
            labelWidth: '0',
            width: 24,
          }
        },
        {
          attrs: {
            label: "类型",
            type: "select",
            primaryKey: "type",
            options: [
              { text: "输入框", value: 'input' },
              { text: "日期", value: 'date' },
              { text: "开关", value: 'switch' },
              { text: "富文本", value: 'richtext' },
            ]
          }
        },
        {
          attrs: {
            label: '',
            type: 'text',
            primaryKey: 'title2',
            labelWidth: '0',
            width: 24,
          }
        },
        {
          attrs: {
            label: "禁用",
            type: "switch",
            primaryKey: "disabled"
          }
        },
        {
          attrs: {
            label: "隐藏",
            type: "switch",
            primaryKey: "hide"
          }
        },
        {
          hide: (model) => model.hide,
          attrs: {
            label: "动态类型",
            width: 24,
            type: model => model.type,
            disabled: model => model.disabled,
            primaryKey: "text"
          }
        }
      ]
    };
  }
};
</script>

```

基于schema的主动校验

```vue
<template>
  <div>
    <AlForm :model="model" :fields="schema.attrs.fields" :schema="schema" />
    <AlButton @click="onClick" text="校验" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {
        input: '',
      },

      schema: {
        tag: 'al-form',
        attrs: {
          primaryKey: '',
          fields: [{
          attrs: {
            label: "输入框",
            type: "input",
            primaryKey: "input",
            rules: [
              { required: true, message: '必填项', trigger: 'blur' }
            ]
          }
        }]
        }
      }
    };
  },

  methods: {
    async onClick () {
      const valid = await this.schema.methods.validate()
      console.log(valid)
    }
  }
};
</script>

```

</docs>
