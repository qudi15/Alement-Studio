<template>
  <div class="al-table">
    <el-form ref="el-form" :model="{model}" v-loading="loading" :disabled="disabled">

      <AlLayout :model="model" justifyContent="flex-start" :children="[operationLayout]" />

      <el-table
        ref="el-table"
        :data="model"
        @selection-change="onSelectionChange"
        @sort-change="onSortChange"
        :emptyText="emptyText"
      >
        <template v-for="(col, index) in columns">
          <el-table-column
            :key="index"
            v-if="inBuildinType(col) && isShow(col, model, extra)"
            :type="getAttr(col, 'type')"
            :fixed="getAttr(col, 'fixed')"
            :width="getAttr(col, 'width')"
          ></el-table-column>
          <el-table-column
            :key="index"
            v-if="!inBuildinType(col) && isShow(col, model, extra)"
            :prop="getAttr(col, 'primaryKey')"
            :label="$t(getAttr(col, 'label'))"
            :sortable="getAttr(col, 'sortable', false)"
            :fixed="getAttr(col, 'fixed')"
            :width="getAttr(col, 'width')"
          >
            <template slot-scope="scope">
              <!-- 单选按钮 -->
              <el-radio
                v-if="isType(col, 'singleSelection', scope)"
                v-model="selected"
                :label="scope.row"
              >{{''}}</el-radio>

              <el-form-item
                v-else
                :prop="'model.' + scope.$index + '.' + getAttr(col, 'primaryKey')"
                :rules="getRules(getAttr(col, 'rules', []), scope)"
              >
                <!-- 文本类型 -->
                <!-- 没有options的纯文本 -->
                <!-- 没有showOverflowTooltip -->
                <al-text
                  v-if="isType(col, 'text', scope) && !getAttr(col, 'options') && !getAttr(col, 'showOverflowTooltip')"
                  :text="getValue(col, scope)"
                  :classList="col.classList" :styleMap="col.styleMap" class="al-table__al-text"
                />
                <!-- 文本类型 -->
                <!-- 没有options的纯文本 -->
                <!-- 有showOverflowTooltip -->
                <el-tooltip v-if="isType(col, 'text', scope) && !getAttr(col, 'options') && getAttr(col, 'showOverflowTooltip')"
                  :content="getValue(col, scope)" placement="top" effect="dark">
                  <al-text
                    :text="getValue(col, scope)"
                    :classList="col.classList" :styleMap="col.styleMap" class="al-table__al-text"
                  />
                </el-tooltip>

                <!-- 有options需要value转text的文本类型 -->
                <al-select
                  v-if="isType(col, 'text', scope) && getAttr(col, 'options')"
                  :placeholder="getAttr(col, 'placeholder', '')"
                  :classList="col.classList" :styleMap="col.styleMap"
                  :disabled="true"
                  :options="getAttr(col, 'options', [])"
                  :value="getValue(col, scope)"
                  class="valueset-text"
                />

                <!-- 文本框 -->
                <al-input
                  v-if="isType(col, 'input', scope)"
                  type="text"
                  :classList="col.classList" :styleMap="col.styleMap"
                  :placeholder="getAttr(col, 'placeholder', '')"
                  :disabled="isDisabled(col, scope)"
                  :value="getValue(col, scope)"
                  :readonly="isReadonly(col, scope)"
                  @input="onValueChange($event, col, scope)"
                  @onBlur="onFieldBlur($event, col, scope)"
                  :clearable="getAttr(col, 'clearable', true)"
                />

                <!-- 多行文本框 -->
                <al-input
                  v-if="isType(col, 'textarea', scope)"
                  type="textarea"
                  :placeholder="getAttr(col, 'placeholder', '')"
                  :classList="col.classList" :styleMap="col.styleMap"
                  :disabled="isDisabled(col, scope)"
                  :clearable="getAttr(col, 'clearable', true)"
                  :readonly="isReadonly(col, scope)"
                  :value="getValue(col, scope)"
                  @input="onValueChange($event, col, scope)"
                />

                <!-- 下拉框 -->
                <al-select
                  v-if="isType(col, ['select', 'valueset'], scope)"
                  :placeholder="getAttr(col, 'placeholder', '', scope)"
                  :classList="col.classList" :styleMap="col.styleMap"
                  :disabled="isDisabled(col, scope)"
                  :options="getAttr(col, 'options', [], scope)"
                  :clearable="getAttr(col, 'clearable', true, scope)"
                  :readonly="isReadonly(col, scope)"
                  :value="getValue(col, scope)"
                  @change="onValueChange($event, col, scope)"
                  :multiple="getAttr(col, 'mode', '', scope) === 'multiple'"
                />

                <!-- 日期 -->
                <al-date
                  v-if="isType(col, 'date', scope)"
                  :type="getAttr(col, 'nativeType', 'date')"
                  :value-format="getAttr(col, 'valueFormat')"
                  :placeholder="getAttr(col, 'placeholder', '')"
                  :classList="col.classList" :styleMap="col.styleMap"
                  :disabled="isDisabled(col, scope)"
                  :clearable="getAttr(col, 'clearable', true)"
                  :readonly="isReadonly(col, scope)"
                  :value="getValue(col, scope)"
                  @change="onValueChange($event, col, scope)"
                />

                <!-- 时间 -->
                <al-time
                  v-if="isType(col, 'time', scope)"
                  :placeholder="getAttr(col, 'placeholder', '')"
                  :classList="col.classList" :styleMap="col.styleMap"
                  :disabled="isDisabled(col, scope)"
                  :clearable="getAttr(col, 'clearable', true)"
                  :readonly="isReadonly(col, scope)"
                  :value="getValue(col, scope)"
                  @change="onValueChange($event, col, scope)"
                />

                <!-- 开关 -->
                <al-switch
                  v-if="isType(col, 'switch', scope)"
                  :placeholder="getAttr(col, 'placeholder', '')"
                  :classList="col.classList" :styleMap="col.styleMap"
                  :disabled="isDisabled(col, scope)"
                  :clearable="getAttr(col, 'clearable', true)"
                  :readonly="isReadonly(col, scope)"
                  :value="getValue(col, scope)"
                  @change="onValueChange($event, col, scope)"
                />

                <!-- 复选框 -->
                <al-checkbox
                  v-if="isType(col, 'checkbox', scope)"
                  :placeholder="getAttr(col, 'placeholder', '')"
                  :classList="col.classList" :styleMap="col.styleMap"
                  :disabled="isDisabled(col, scope)"
                  :options="getAttr(col, 'options', [])"
                  :readonly="isReadonly(col, scope)"
                  :value="getValue(col, scope)"
                  @change="onValueChange($event, col, scope)"
                />

                <!-- 单选框 -->
                <al-radio
                  v-if="isType(col, 'radio', scope)"
                  :placeholder="getAttr(col, 'placeholder', '')"
                  :classList="col.classList" :styleMap="col.styleMap"
                  :disabled="isDisabled(col, scope)"
                  :options="getAttr(col, 'options', [])"
                  :readonly="isReadonly(col, scope)"
                  :value="getValue(col, scope)"
                  @change="onValueChange($event, col, scope)"
                />

                <!-- 数值输入框 -->
                <al-input-number
                  v-if="isType(col, 'number', scope)"
                  :placeholder="getAttr(col, 'placeholder', '')"
                  :classList="col.classList" :styleMap="col.styleMap"
                  :disabled="isDisabled(col, scope)"
                  :min="getAttr(col, 'min')"
                  :max="getAttr(col, 'max')"
                  :precision="getAttr(col, 'precision')"
                  :readonly="isReadonly(col, scope)"
                  :value="getValue(col, scope)"
                  @change="onValueChange($event, col, scope)"
                />

                <!-- 操作列 -->
                <div v-if="isType(col, 'action', scope)" class="table-action-column">
                  <div
                    v-for="(ac, index) in getAttr(col, 'options', [])"
                    :key="index"
                    v-show="isShow(ac, scope)"
                  >
                    <al-button
                      :class-list="ac.classList"
                      :type="getAttr(ac, 'type')"
                      :icon="getAttr(ac, 'icon', '')"
                      :text="getAttr(ac, 'label', '')"
                      :disabled="isDisabled(ac, scope)"
                      @click="onActionBtnClick(ac, scope)"
                    />
                  </div>
                </div>

                <!-- 弹窗查询输入框 -->
                <al-input-modal-search
                  :classList="col.classList" :styleMap="col.styleMap"
                  v-if="isType(col, 'search', scope)"
                  :placeholder="getAttr(col, 'placeholder', '')"
                  v-bind="getAttr(col, 'attrs', {})"
                  :disabled="isDisabled(col, scope)"
                  :value="getValue(col, scope)"
                  :model="scope"
                  @change="onValueChange($event, col, scope)"
                />

                <!-- 按钮 -->
                <al-button
                  v-if="isType(col, 'button', scope)"
                  :text="getAttr(col, 'text')"
                  :type="getAttr(col, 'nativeType')"
                  :disabled="isDisabled(col)"
                  @click="onEvent($event, col, 'onClick', scope)"
                  :classList="col.classList" :styleMap="col.styleMap"
                />
              </el-form-item>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <div v-if="pagination" class="al-table-pagination">
        <el-pagination
          background
          v-bind="computedPagination"
          @size-change="onPageSizeChange"
          @current-change="onPageIndexChange"
        ></el-pagination>
      </div>
    </el-form>
  </div>
</template>

<script>
import alButton from '../al-button/al-button'
import alSwitch from '../al-switch/al-switch'
import alCheckbox from '../al-checkbox/al-checkbox'
import alInput from '../al-input/al-input'
import alInputNumber from '../al-input-number/al-input-number'
// import alForm from '../al-form/al-form'
import alText from '../al-text/al-text'
import alRadio from '../al-radio/al-radio'
import alDate from '../al-date/al-date'
// import alIcon from '../al-icon/al-icon'
import alSelect from '../al-select/al-select'
import alTime from '../al-time/al-time'
import alInputModalSearch from '../al-input-modal-search/al-input-modal-search'
import AlLayout from '../al-layout/al-layout'
// import alPage from '../al-page/al-page'
// import alModal from '../al-modal/al-modal'

import validationMixin from '../../mixins/validation'
import containerMixin from '../../mixins/container'
import { alGetterCoolPath, alSetterCoolPath } from '../../utils'
/**
 * 表格
 * @displayName Al Table
 */
export default {
  name: 'al-table',

  inject: [
    'registerValidationComponent',
    'unregisterValidationComponent'
  ],

  components: {
    alSwitch,
    alCheckbox,
    alInput,
    alInputNumber,
    alText,
    alRadio,
    alDate,
    alSelect,
    alTime,
    alButton,
    alInputModalSearch,
    AlLayout
  },

  mixins: [
    validationMixin,
    containerMixin
  ],

  props: {
    /**
     * 表格绑定的值
     * @values []
     */
    model: {
      type: Array,
      default () {
        return []
      }
    },
    /**
     * 表格额外需要的值 使用者自己传
     */
    extra: {
      type: Object
    },
    /**
     * 表格列配置项
     * @values []
     */
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    /**
     * 置灰表格所有元素
     * @values true false
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * table 所有控件只读
     * @values true false
     */
    readonly: {
      type: Boolean,
      default: false
    },
    /**
     * 表格高度 Number单位为px
     * @values 200 '200px'
     */
    height: {
      type: [Number, String]
    },
    /**
     * 表格最大高度 Number单位为px
     * @values 200 '200px'
     */
    maxHeight: {
      type: [Number, String]
    },
    /**
     * 是否为斑马纹 table
     * @values true false
     */
    stripe: {
      type: Boolean,
      default: false
    },
    /**
     * 是否带有纵向边框
     * @values true false
     */
    border: {
      type: Boolean,
      default: false
    },
    /**
     * 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。({ row, rowIndex }) => {}
     * @values -
     */
    rowClassName: {
      type: [String, Function]
    },
    /**
     * 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。({ row, rowIndex }) => {}
     * @values -
     */
    headerRowClassName: {
      type: [String, Function]
    },
    /**
     * 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。({ row, rowIndex }) => {}
     * @values -
     */
    cellClassName: {
      type: [String, Function]
    },
    /**
     * 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。({ row, rowIndex }) => {}
     * @values -
     */
    headerCellClassName: {
      type: [String, Function]
    },
    /**
     * 空数据时显示的文本内容
     * @values '暂无数据'
     */
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    /**
     * 表格的loading状态
     * @values true false
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * 表格的添加按钮
     * @values true false
     */
    hideAddBtn: {
      type: [Boolean, Function],
      default: false
    },
    /**
     * 表格的删除按钮
     * @values true false
     */
    hideDelBtn: {
      type: [Boolean, Function],
      default: false
    },
    /**
     * 控制表格分页是否展示
     * @values true false
     */
    pagination: {
      type: [Boolean, Object],
      default: true
    },

    /**
     * 新增按钮的文字
     */
    addBtnText: {
      type: String,
      default: '添加'
    }
  },

  data () {
    return {
      selection: []
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

  computed: {
    selected: {
      get () {
        return this.selection.length ? this.selection[0] : {}
      },
      set (selected) {
        this.onSelectionChange([selected])
      }
    },

    operationLayout () {
      return {
        tag: 'al-layout',
        styleMap: {
          marginTop: '20px'
        },
        children: [
          {
            tag: 'al-button',
            children: [],
            hide: this.hideAddBtn,
            attrs: {
              type: 'primary',
              text: this.addBtnText
            },
            events: {
              onClick: this.onAddBtnClick.bind(this)
            }
          },
          {
            tag: 'al-button',
            children: [],
            hide: this.isDelBtnHide(),
            attrs: {
              disabled: !this.selection.length,
              text: '删除'
            },
            events: {
              onClick: this.onDelBtnClick.bind(this)
            }
          },

          // 从pageDetail的children中筛选出slot: 'operation'的子元素，实现插槽的功能
          ...this.children.filter(child => child.slot === 'operation')
        ]
      }
    },

    computedPagination () {
      const pagination = this.pagination || {}
      return {
        layout: 'total, sizes,prev, pager, next, jumper, ->',
        pageSize: pagination.pageSize || 10,
        currentPage: pagination.pageIndex || 0,
        total: pagination.total || 0,
        pageSizes: pagination.pageSizes || [10, 20, 30, 40, 50, 100]
      }
    }

    // paginationLayout () {
    //   const layout = []
    //   if (this.pagination) {
    //     if (this.pagination.showTotal) {
    //       layout.push('total')
    //     }
    //     if (this.pagination.showSizes) {
    //       layout.push('sizes')
    //     }
    //     if (this.pagination.showPrev) {
    //       layout.push('prev')
    //     }
    //     if (this.pagination.showPager) {
    //       layout.push('pager')
    //     }
    //     if (this.pagination.showNext) {
    //       layout.push('next')
    //     }
    //     if (this.pagination.showJumper) {
    //       layout.push('jumper')
    //     }
    //   }
    //   return layout.join(', ')
    // }
  },

  methods: {
    /**
     * @private
     */
    isShow (action = {}, scope) {
      const hide = action.hide
      if (typeof hide === 'boolean') {
        return !hide
      }
      if (typeof hide === 'function') {
        return !hide(scope, this.extra)
      }
      return true
    },
    /**
     * @private
     */
    inBuildinType (col = {}) {
      const type = this.getAttr(col, 'type')
      return ['index', 'selection'].includes(type)
    },

    /**
     * 获取events中的事件
     * @private
     */
    getEvents (col = {}, name = '') {
      return (col.events || {})[name]
    },

    onEvent (event, col = {}, name, scope) {
      const schemaEvent = this.getEvents(col, name)
      if (typeof schemaEvent === 'function') {
        schemaEvent(event, scope, this.extra)
      }
    },

    /**
     * 判断字段的配型
     * @private
     * @returns boolean
     */
    isType (field = {}, expectedType = '', scope) {
      const expectedTypes = Array.isArray(expectedType) ? expectedType : [expectedType]
      const type = this.getAttr(field, 'type', '', scope)
      if (expectedTypes.includes(type)) {
        return true
      }
      if (typeof type === 'function') {
        return expectedTypes.includes(type(scope, this.extra))
      }
      return false
    },

    /**
     * 判断字段是否禁用
     * @private
     */
    isDisabled (col = {}, scope) {
      if (this.disabled) {
        return true
      }
      const disabled = this.getAttr(col, 'disabled', false, scope)
      if (typeof disabled === 'boolean') {
        return disabled
      }
      if (typeof disabled === 'function') {
        return disabled(scope, this.extra)
      }
      return false
    },

    /**
     * 判断字段是否只读
     * @private
     */
    isReadonly (col = {}, scope) {
      if (this.readonly) {
        return true
      }
      const readonly = this.getAttr(col, 'readonly')
      if (typeof readonly === 'boolean') {
        return readonly
      }
      if (typeof readonly === 'function') {
        return readonly(scope, this.extra)
      }
      return false
    },

    /**
     * 获取字段的值
     * @private
     */
    getValue (col = {}, scope) {
      const key = this.getAttr(col, 'primaryKey')
      const format = this.getAttr(col, 'format')
      const val = key ? alGetterCoolPath(scope.row, key) : scope.row
      if (typeof format === 'function') {
        return format(val, scope, this.extra)
      }
      return val
    },

    /**
     * 当filed触发blur事件时
     * @private
     */
    onFieldBlur (event, field = {}, scope) {
      const schemaEvent = this.getEvent(field, 'onBlur')
      if (typeof schemaEvent === 'function') {
        schemaEvent(event, this.model, this.extra, scope)
      }
    },

    /**
     * 当字段值发生变化时
     * @private
     */
    onValueChange (event, col = {}, scope) {
      const key = this.getAttr(col, 'primaryKey')
      if (!key) {
        return
      }
      const parse = this.getAttr(col, 'parse')
      const val =
        typeof parse === 'function' ? parse(event, scope, this.extra) : event
      alSetterCoolPath(scope.row, key, val)

      const schemaEvent = this.getEvents(col, 'onChange')
      if (typeof schemaEvent === 'function') {
        schemaEvent(val, scope, this.extra)
      }
    },

    /**
     * @private
     */
    onPageSizeChange (event) {
      this.$emit('onPageSizeChange', event)
    },

    /**
     * @private
     */
    onPageIndexChange (event) {
      this.$emit('onPageIndexChange', event)
    },

    /**
     * @private
     */
    onSortChange (event) {
      this.$emit('onSortChange', event)
    },

    /**
     * @private
     */
    onSelectionChange (event) {
      this.selection = event
      this.$emit('onSelectionChange', event)
    },

    /**
     * @private
     */
    onAddBtnClick () {
      this.$emit('onAddBtnClick')
    },

    /**
     * @private
     */
    onDelBtnClick () {
      this.$emit('onDelBtnClick', this.selection)
    },

    /**
     * @private
     */
    onActionBtnClick (col = {}, scope) {
      const clickEvent = this.getEvents(col, 'onClick')
      if (typeof clickEvent === 'function') {
        const confirm = this.getAttr(col, 'confirm', false)
        const confirmTitle = this.getAttr(col, 'confirmTitle', '')
        if (confirm) {
          this.$confirm(confirmTitle, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              clickEvent(scope, this.extra)
            })
            .catch(_ => _)
        } else {
          clickEvent(scope, this.extra)
        }
      }
    },

    /**
     * @private
     */
    isDelBtnHide () {
      return (
        this.hideDelBtn ||
        !this.columns.find(col => this.getAttr(col, 'type') === 'selection')
      )
    },

    /**
     * 校验事件
     * @returns {Promise}
     * @public
     */
    validate () {
      return new Promise((resolve, reject) => {
        this.$refs['el-form'].validate(validateResult => {
          // if (this.validate) {
          // return this.events.validate(this.model, this.extra, validateResult)
          // } else {
          resolve(validateResult)
          // }
        })
      })
    },

    getRules (rules = [], scope) {
      return rules.map(rule => {
        if (typeof rule.validator === 'function') {
          return {
            ...rule,
            validator: (fieldRule, value, cb) => {
              rule.validator(value, scope, cb, this.extra)
            }
          }
        } else {
          return rule
        }
      })
    },

    alFormControlChange (model, keyPath, value) {
      if (keyPath) {
        alSetterCoolPath(model, keyPath, value, this)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.al-table-pagination {
  text-align: right;
}

.valueset-text {
  /deep/ .el-input.is-disabled input {
    padding: 0;
    border: none;
    background: none;
    cursor: initial;
    color: inherit;
  }

  /deep/ .el-input__suffix {
    display: none;
  }
}

.table-action-column {
  display: flex;

  > *:nth-child(n + 2) {
    margin-left: 10px;
  }
}
.al-table__al-text{
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

<docs>

#### 基本功能

```vue
<template>
  <AlTable
    :model="model"
    :columns="columns"
    @onDelBtnClick="onDelBtnClick"
    @onAddBtnClick="onAddBtnClick"
  />
</template>
<script>
export default {
  data() {
    return {
      model: [
        {
          input: "输入框",
          text: "文本",
          select: "",
          selectMuti: [],
          date: new Date(),
          time: new Date(),
          switch: false,
          checkbox: [],
          radio: "",
          number: 1,
          search: null,
          richtext: "Hello world"
        }
      ],
      columns: [
        {
          attrs: {
            fixed: "left",
            label: "请选择",
            type: "singleSelection"
          }
        },
        {
          attrs: {
            fixed: "left",
            type: "selection"
          }
        },
        {
          attrs: {
            width: "200px",
            label: "文本",
            type: "text",
            primaryKey: "text"
          }
        },
        {
          attrs: {
            width: "200px",
            label: "输入框",
            type: "input",
            primaryKey: "input"
          }
        },
        {
          attrs: {
            width: "200px",
            label: "下拉选项",
            type: "select",
            primaryKey: "select",
            options: [{ text: "选项1", value: 1 }]
          }
        },
        {
          attrs: {
            width: "200px",
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
            width: "200px",
            label: "日期",
            type: "date",
            primaryKey: "date"
          }
        },
        {
          attrs: {
            width: "200px",
            label: "时间",
            type: "time",
            primaryKey: "time"
          }
        },
        {
          attrs: {
            width: "200px",
            label: "开关",
            type: "switch",
            primaryKey: "switch"
          }
        },
        {
          attrs: {
            width: "200px",
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
            width: "200px",
            label: "单选",
            type: "radio",
            primaryKey: "radio",
            options: [
              { text: "选项1", value: "1" },
              { text: "选项2", value: "2" }
            ]
          }
        },
        {
          attrs: {
            width: "200px",
            label: "数值",
            type: "number",
            primaryKey: "number"
          }
        },
        {
          attrs: {
            width: "200px",
            label: "查询弹窗",
            type: "search",
            primaryKey: "search",
            attrs: {
              format: "name",
              searchOrders: [{ fieldName: "createTime", order: "desc" }],
              searchApi: "/api/authority-role/search",
              countApi: "/api/authority-role/count",
              fields: [
                {
                  label: "文本框",
                  primaryKey: "code",
                  conditionOperator: "like"
                },
                {
                  label: "锁定",
                  primaryKey: "name",
                  conditionOperator: "like",
                  fixed: true
                }
              ],
              columns: [
                { label: "请选择", type: "singleSelection" },
                { label: "编码", primaryKey: "code" },
                { label: "名称", primaryKey: "name" }
              ]
            }
          }
        },
        {
          attrs: {
            label: "按钮",
            width: "200px",
            type: "button",
            text: "按钮"
          }
        },
        {
          attrs: {
            fixed: "right",
            type: "action",
            options: [
              {
                attrs: {
                  type: "text",
                  label: "删除"
                },
                events: {
                  onClick: scope => {
                    this.onDelBtnClick([scope.row]);
                  }
                }
              }
            ]
          }
        }
      ]
    };
  },

  methods: {
    onDelBtnClick(rows, model) {
      this.model = this.model.filter(row => !rows.find(r => r === row));
    },

    onAddBtnClick() {
      this.model.push({
        input: "输入框",
        text: "文本",
        select: "",
        selectMuti: [],
        date: new Date(),
        time: new Date(),
        switch: false,
        checkbox: [],
        radio: "",
        number: 1,
        richtext: "Hello world"
      });
    }
  }
};
</script>

```

#### 隐藏按钮及分页

```vue
<template>
  <AlTable
    :model="model"
    :columns="columns"
    :pagination="false"
    :hideAddBtn="true"
    :hideDelBtn="true"
  />
</template>
<script>
export default {
  data() {
    return {
      model: [
        {
          text: "文本"
        }
      ],
      columns: [{ attrs: { label: "text", type: "text", primaryKey: "text" } }]
    };
  }
};
</script>

```

#### 动态属性

```vue
<template>
  <AlTable
    :model="model"
    :columns="columns"
    @onDelBtnClick="onDelBtnClick"
    @onAddBtnClick="onAddBtnClick"
  />
</template>
<script>
export default {
  data() {
    return {
      model: [
        {
          type: "input",
          disabled: false,
          dynamic: ""
        }
      ],
      columns: [
        {
          attrs: {
            label: "类型",
            type: "select",
            primaryKey: "type",
            width: "200px",
            options: [
              { text: "输入框", value: "input" },
              { text: "文本", value: "text" },
              { text: "下拉框", value: "select" },
              { text: "单选框", value: "radio" }
            ]
          }
        },
        {
          attrs: {
            label: "禁用",
            type: "switch",
            primaryKey: "disabled",
            width: "100px"
          }
        },
        {
          attrs: {
            label: "动态类型",
            type: (scope, model) => scope.row.type,
            disabled: (scope, model) => scope.row.disabled,
            options: [
              { text: "选项1", value: "1" },
              { text: "选项2", value: "2" },
              { text: "选项3", value: "3" }
            ],
            primaryKey: "dynamic"
          }
        }
      ]
    };
  },

  methods: {
    onDelBtnClick(rows, model) {
      this.model = this.model.filter(row => !rows.find(r => r === row));
    },

    onAddBtnClick() {
      this.model.push({
        type: "input",
        disabled: false,
        dynamic: ""
      });
    }
  }
};
</script>

```

#### 自定义按钮

```vue
<template>
  <AlTable
    :model="model"
    :columns="columns"
    :children="children"
  />
</template>
<script>
export default {
  data() {
    return {
      children: [
        {
          slot: 'operation',
          tag: 'al-button',
          attrs: {
            text: '自定义按钮'
          },
          events: {
            onClick () {
              console.log('自定义按钮')
            }
          }
        }
      ],
      model: [
        {
          type: "input",
          disabled: false,
          dynamic: ""
        }
      ],
      columns: [
        {
          attrs: {
            label: "类型",
            type: "select",
            primaryKey: "type",
            options: [
              { text: "输入框", value: "input" },
              { text: "文本", value: "text" },
              { text: "下拉框", value: "select" },
              { text: "单选框", value: "radio" }
            ]
          }
        }
      ]
    };
  },

  methods: {
    onDelBtnClick(rows, model) {
      this.model = this.model.filter(row => !rows.find(r => r === row));
    },

    onAddBtnClick() {
      this.model.push({
        type: "input",
        disabled: false,
        dynamic: ""
      });
    }
  }
};
</script>

```

#### 基于schema的主动校验

```vue
<template>
  <AlTable
    :model="model"
    :columns="schema.attrs.columns"
    :hideAddBtn="true"
    :children="children"
    :schema="schema"
  />
</template>
<script>
export default {
  data() {
    return {
      schema: {
        tag: 'al-table',
        attrs: {
          columns: [
            {
              attrs: {
                label: "输入框",
                type: "input",
                primaryKey: "input",
                rules: [
                  { required: true, message: '必填项', trigger: 'blur' }
                ]
              },
            }
          ]
        }
      },
      children: [
        {
          slot: 'operation',
          tag: 'al-button',
          attrs: {
            text: '校验'
          },
          events: {
            onClick: async () => {
              const valid = await this.schema.methods.validate()
              console.log(valid)
            }
          }
        }
      ],
      model: [
        {
          input: ""
        }
      ],
    };
  }
};
</script>

```

</docs>
