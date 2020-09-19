<template>
  <div class="al-page-search">
    <AlText :text="searchParamsTitle" />
    <AlForm :model="model" :extra="extra" :fields="computedFields" />
    <div class="search-params-layout">
      <AlLayout :model="model" justifyContent="flex-end" :children="[operationLayout]" />
      <!-- <AlButton v-if="!hideResetBtn" :text="'重置'" @click="onResetBtnClick" /> -->
      <!-- <AlButton v-if="!hideSearchBtn" :loading="searching" type="primary" :text="'查询'" @click="onSearchBtnClick" /> -->
    </div>
    <AlText :text="searchResultTitle" />
    <AlTable ref="tableRef" :loading="searching" :model="searchResult" :hideDelBtn="true" :hideAddBtn="hideAddBtn" :addBtnText="addBtnText"
      :extra="extra" :columns="computedColumns" :pagination="pagination" @onAddBtnClick="onAddBtnClick"
      @onPageSizeChange="onPageSizeChange" @onPageIndexChange="onPageIndexChange" @onSelectionChange="onSelectionChange" />
  </div>
</template>

<script>

import ContainerMixin from '../../mixins/container'
import AlLayout from '../al-layout/al-layout'
import AlText from '../al-text/al-text'

/**
 * 查询字段中的值集
 */
const findValuesetFields = (fields = []) => {
  return fields.filter(field => field.type === 'valueset').concat(fields.reduce((rst, field) => {
    return rst.concat(findValuesetFields(field.children))
  }, []))
}

const getAttr = (field = {}, name, def) => {
  const attrs = field.attrs || {}
  const val = attrs[name]
  return val == null ? def : val
}

/**
 * 根据查询条件构造API查询参数
 */
const generateFilterFields = (fields = [], params = {}) => {
  const filterFields = []
  fields.forEach(field => {
    const key = field.primaryKey
    let val = params[key]

    // 空值时不需要构造查询条件
    if (val == null || val === '') { return }

    // 字段类型为search时，根据parse从对象中获取字段
    if (field.type === 'search') {
      const parse = getAttr(field, 'parse')
      if (typeof parse === 'function') { val = parse(val) }
      if (typeof parse === 'string') { val = val[parse] }
    }

    filterFields.push({
      fieldName: key,
      relationship: field.relationship || 'AND',
      conditionOperator: field.conditionOperator || '=',
      value: [val]
    })
  })
  return filterFields
}

const DEFAULT_LABEL_WIDTH = '150px'

/**
 * 查询页面
 * @displayName Al Page Search
 */
export default {

  mixins: [ContainerMixin],

  components: {
    AlLayout,
    AlText
  },

  props: {
    /**
     * 主键
     */
    primaryKey: {
      required: true,
      type: String
    },

    /**
     * 查询数据用的api
     * /api/valueset/query
     */
    searchApi: {
      required: true,
      type: String
    },

    /**
     * 计数用的api
     * /api/valueset/count
     */
    countApi: {
      type: String
    },

    /**
     * 删除用的api
     * /api/valueset/remove
     */
    deleteApi: {
      type: String
    },

    /**
     * 查询条件
     */
    fields: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },

    /**
     * 查询结果列信息
     */
    columns: {
      type: Array,
      default () {
        return []
      }
    },

    /**
     * 额外的参数
     */
    extra: {
      type: Object
    },

    /**
     * 搜索前的钩子函数
     */
    beforeSearchHook: {
      type: Function
    },

    /**
     * 是否隐藏新增按钮
     */
    hideAddBtn: {
      type: Boolean
    },

    /**
     * 默认查询条件
     */
    model: {
      type: Object,
      default () {
        return {}
      }
    },

    /**
     * 查询字段排序
     */
    searchOrders: {
      type: Array,
      default () {
        return []
      }
    },

    /**
     * 是否隐藏重置按钮
     */
    hideResetBtn: {
      type: Boolean
    },

    /**
     * 是否隐藏查询按钮
     */
    hideSearchBtn: {
      type: Boolean
    },

    /**
     * 页面的子元素，多用于插槽扩展
     */
    children: {
      type: Array,
      default () {
        return []
      }
    },

    /**
     * 新增按钮的文字
     */
    addBtnText: {
      type: String,
      default: '添加'
    },

    /**
     * 查询条件的标题
     */
    searchParamsTitle: {
      type: String
    },

    /**
     * 查询结果的标题
     */
    searchResultTitle: {
      type: String
    }
  },

  data () {
    return {
      searchResult: [],

      searching: false,

      pagination: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      }
    }
  },

  watch: {
    fields: {
      handler () {
        this.setModelValue()
      },
      deep: true
    }
  },

  created () {
    this.setModelValue()
    this.getValueSets()
    this.search()
  },

  computed: {
    computedFields () {
      return this.generateFormFields()
    },

    computedColumns () {
      return this.generateTableColumns()
    },

    operationLayout () {
      return {
        tag: 'al-layout',
        styleMap: {
          marginTop: '20px'
        },
        children: [
          // 从pageSearch的children中筛选出slot: 'operation'的子元素，实现插槽的功能
          ...this.children.filter(child => child.slot === 'operation'),
          {
            tag: 'al-button',
            children: [],
            hide: this.hideResetBtn,
            attrs: {
              text: '重置'
            },
            events: {
              onClick: this.onResetBtnClick.bind(this)
            }
          },
          {
            tag: 'al-button',
            children: [],
            hide: this.hideSearchBtn,
            attrs: {
              type: 'primary',
              text: '查询'
            },
            events: {
              onClick: this.onSearchBtnClick.bind(this)
            }
          }
        ]
      }
    }
  },

  methods: {
    // 根据fields给model设置默认值
    setModelValue () {
      this.fields.forEach(field => {
        const key = field.primaryKey
        if (this.model[key] == null) {
          this.$set(this.model, key, null)
        }
      })
    },

    onSearchBtnClick () {
      this.searchFromFirstPage()
    },

    /**
     * 回到第一页并查询
     * 1. 回到第一页
     * 2. 查询
     *
     * @public
     */
    searchFromFirstPage () {
      this.pagination.pageIndex = 1
      this.search()
    },

    async getValueSets () {
      const fields = [].concat(this.fields, this.columns)
      const valuesetFields = findValuesetFields(fields)
      const toggleLoading = flg => valuesetFields.forEach(field => { field.loading = flg })

      if (!valuesetFields.length) { return }
      try {
        toggleLoading(true)
        const rst = await this.$service.ValuesetService.getOptionsByCodes(valuesetFields.map(field => field.code))
        valuesetFields.forEach(field => {
          const code = field.code
          const options = ((rst || []).find(valueset => valueset.code === code) || {}).options
          this.$set(field, 'options', options.map(opt => ({ text: opt.label, value: opt.value })))
        })
      } catch (error) {
        console.log(error)
      } finally {
        toggleLoading(false)
      }
    },

    /**
     * 查询
     *
     * @public
     */
    async search () {
      const beforeSearchHook = this.beforeSearchHook
      const pageIndex = this.pagination.pageIndex - 1
      const pageSize = this.pagination.pageSize
      const fields = this.fields
      const params = this.model
      const searchApi = this.searchApi
      const countApi = this.countApi

      try {
        let requestBody = { data: { filterFields: generateFilterFields(fields, params), orderFields: this.searchOrders, pageIndex, pageSize } }
        if (typeof beforeSearchHook === 'function') {
          requestBody = beforeSearchHook(requestBody)
        }
        this.searching = true
        const dataSearch = this.$http.post(searchApi, requestBody)
        // 不传countApi则不需要分页
        const totalSearch = countApi ? this.$http.post(countApi, requestBody) : null
        const [dataSearchRst, totalSearchRst] = await Promise.all([dataSearch, totalSearch].filter(_ => _))
        this.searchResult = dataSearchRst.data || []
        // 不传countApi则不需要分页
        this.pagination.total = countApi ? (totalSearchRst.data || 0) : this.searchResult.length
        this.pagination = countApi ? this.pagination : null
      } catch (error) {
        console.log(error)
      } finally {
        this.searching = false
      }
    },

    async deleteRow (scope, ac) {
      const primaryKey = this.primaryKey
      const deleteApi = this.deleteApi
      const resultLength = this.searchResult.length
      const pageIndex = this.pagination.pageIndex
      if (!deleteApi) { return }
      const row = scope.row || {}
      const code = row[primaryKey]
      try {
        await this.$http.post(deleteApi, {
          data: [code]
        })
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        // 当前页条目数大于2则不切换到上一页
        this.pagination.pageIndex = resultLength > 1 ? pageIndex : (pageIndex > 1 ? pageIndex - 1 : pageIndex)
        this.search()
      } catch (error) {
        console.log(error)
      } finally {

      }
    },

    /**
     * 重置查询条件
     * @public
     */
    resetSearchParams () {
      this.fields.forEach(field => {
        const fixed = field.fixed
        const primaryKey = field.primaryKey
        if (!fixed) {
          this.$set(this.model, primaryKey, null)
        }
      })
    },

    onResetBtnClick () {
      this.resetSearchParams()
    },

    generateFormFields () {
      const fields = this.fields || []

      const changeType = (type = 'input') => {
        // 将值集变成下拉
        if (type === 'valueset') { return 'select' }
        return type
      }

      return fields.map(field => {
        return {
          hide: field.hide,
          attrs: {
            ...field,
            noNestedKey: field.type === 'search',
            type: changeType(field.type),
            disabled: field.fixed ? true : field.disabled,
            lableWidth: field.lableWidth || DEFAULT_LABEL_WIDTH
          },
          styleMap: field.styleMap,
          classList: field.classList,
          events: field.events,
          children: field.children
        }
      })
    },

    generateTableColumns () {
      const columns = this.columns || []

      const changeType = (type = 'text') => {
        // 将值集编程文本类型，在al-table中把value转成text
        if (type === 'valueset') { return 'text' }
        return type
      }

      return columns.map(column => {
        // 构造查询专用的操作列
        if (column.type === 'operation') {
          return this.generateOperationColumn(column)
        }

        return {
          hide: column.hide,
          attrs: {
            ...column,
            type: changeType(column.type),
            disabled: column.type === 'valueset' ? true : column.disabled
          },
          events: column.events,
          styleMap: column.styleMap,
          classList: column.classList,
          children: column.children
        }
      })
    },

    generateOperationColumn (column = {}) {
      const { hideViewBtn, hideEditBtn, hideDelBtn } = column
      return {
        hide: column.hide,
        attrs: {
          ...column,
          type: 'action',
          options: [
            {
              hide: scope => typeof hideViewBtn === 'function' ? hideViewBtn(scope) : false,
              attrs: {
                type: 'text',
                label: '查看'
              },
              events: {
                onClick: (scope) => {
                  /**
                   * 查询结果表格行查看按钮被点击时
                   * @event onViewBtnClick
                   * @type {TableRowScope}
                   */
                  this.$emit('onViewBtnClick', scope)
                }
              }
            },
            {
              hide: scope => typeof hideEditBtn === 'function' ? hideEditBtn(scope) : false,
              attrs: {
                type: 'text',
                label: '编辑'
              },
              events: {
                onClick: (scope) => {
                  /**
                   * 查询结果表格行编辑按钮被点击时
                   * @event onEditBtnClick
                   * @type {TableRowScope}
                   */
                  this.$emit('onEditBtnClick', scope)
                }
              }
            },
            {
              hide: scope => typeof hideDelBtn === 'function' ? hideDelBtn(scope) : false,
              attrs: {
                confirm: true,
                confirmTitle: '确认要删除?',
                type: 'text',
                label: '删除'
              },
              events: {
                onClick: (scope) => {
                  this.deleteRow(scope)
                }
              }
            }
          ]
        }
      }
    },

    onPageSizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.search()
    },

    onPageIndexChange (pageIndex) {
      this.pagination.pageIndex = pageIndex
      this.search()
    },

    onAddBtnClick () {
      /**
       * 新增按钮被点击时
       * @event onAddBtnClick
       * @type {void}
       */
      this.$emit('onAddBtnClick')
    },

    onSelectionChange (event) {
      /**
       * 表格中选中的列改变时触发，只有出现单选或多选列时
       * @event onSelectionChange
       * @type {void}
       */
      this.$emit('onSelectionChange', event)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-params-layout {
  display: flex;
  justify-content: flex-end;
}
</style>

<docs>

```vue
<template>
  <AlPageSearch
    primaryKey="code"
    :model="params"
    :fields="fields"
    :columns="columns"
    :searchApi="searchApi"
    :countApi="countApi"
    :deleteApi="deleteApi"
    :searchOrders="searchOrders"
    :hideAddBtn="hideAddBtn"
    :hideSearchBtn="hideSearchBtn"
    :hideResetBtn="hideResetBtn"
    @onAddBtnClick="onAddBtnClick"
    @onViewBtnClick="onViewBtnClick"
    @onEditBtnClick="onEditBtnClick"
    :children="children"
    :searchParamsTitle="searchParamsTitle"
    :searchResultTitle="searchResultTitle"
  />
</template>
<script>

export default {
  data () {
    return {
      hideAddBtn: false,
      hideSearchBtn: false,
      hideResetBtn: false,

      searchParamsTitle: '查询条件',
      searchResultTitle: '查询结果',

      params: {
        code: '',
        name: '不能修改且清空',
        status: '1',
        date: new Date,
        daterange: [],
        switch: false,
        width: '更多类型请在form组件中查看',
        title1: '子标题'
      },
      searchOrders: [
        { fieldName: 'createTime', order: 'desc' }
      ],

      searchApi: '/api/authority-role/search',
      countApi: '/api/authority-role/count',
      deleteApi: '/api/authority-role/remove',

      fields: [
        { label: '文本框', primaryKey: 'code', conditionOperator: 'like' },
        { label: '锁定', primaryKey: 'name', conditionOperator: 'like', fixed: true },
        { label: '日期', primaryKey: 'date', conditionOperator: 'like', type: 'date' },
        { label: '', primaryKey: 'title1', type: 'text', width: 24, labelWidth: '0' },
        { label: '开关', primaryKey: 'switch', conditionOperator: 'like', type: 'switch' },
        {
          label: '下拉框',
          primaryKey: 'status',
          type: 'select',
          options: [
            {
              text: '未启用',
              value: '1'
            },
            {
              text: '启用',
              value: '2'
            },
            {
              text: '禁用',
              value: '3'
            }
          ]
        },
        { label: '宽度', primaryKey: 'width', conditionOperator: 'like', width: 24 },
        { label: '日期范围', primaryKey: 'daterange', conditionOperator: 'like', type: 'date', nativeType: 'daterange' }
      ],
      columns: [
        { type: 'singleSelection', label: '请选择', fixed: 'left' },
        { type: 'selection', fixed: 'left' },
        { label: '编码', primaryKey: 'code', width: '200px' },
        { label: '名称', primaryKey: 'name', width: '200px' },
        {
          label: '状态',
          options: [
            {
              text: '未启用',
              value: '1'
            },
            {
              text: '启用',
              value: '2'
            },
            {
              text: '禁用',
              value: '3'
            }
          ],
          primaryKey: 'status',
          width: '200px'
        },
        {
          label: '创建时间',
          primaryKey: 'createTime',
          width: '200px'
        },
        {
          label: '更新时间',
          primaryKey: 'modifyTime',
          width: '200px'
        },
        {
          label: '操作列',
          type: 'operation',
          fixed: 'right',
          width: '150px',
          hideDelBtn: scope => !['1'].includes(scope.row.status)
        }
      ],

      children: [
        {
          tag: 'al-button',
          slot: 'operation',
          attrs: {
            text: '自定义按钮'
          },
          events: {
            onClick() {
              console.log('onClick')
            }
          }
        }
      ]
    }
  },

  created () {
  },

  methods: {
    onAddBtnClick () {
      console.log('onAddBtnClick')
    },

    onViewBtnClick (scope) {
      console.log('onViewBtnClick', scope)
    },

    onEditBtnClick (scope) {
      console.log('onEditBtnClick', scope)
    }
  }
}
</script>
```

</docs>
