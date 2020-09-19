// 表格组件中要加上 表格前 button 表格后 底部的插槽
export default {
  tag: '', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value
  hide: false,
  attrs: {
    // 节点的特殊属性 key: value
    columns: [
      // column type uniqKey sortable width label fixed resizable align headerAlign showOverflowTooltip tag attrs
    ],
    height: '', // 如果 height 为 number 类型，单位 px；可以为字符串
    maxHeight: '', // number string
    stripe: true,
    border: true,
    // 也可以为string
    rowClassName: ({ row, rowIndex }) => {
      return ''
    },
    // 也可以为string
    headerRowClassName: ({ row, rowIndex }) => {
      return ''
    },
    // 也可以为string
    cellClassName: ({ row, column, rowIndex, columnIndex }) => {
      return ''
    },
    // 也可以为string
    headerCellClassName: ({ row, column, rowIndex, columnIndex }) => {
      return ''
    },
    emptyText: '',
    loading: true,
    disabled: true,
    readonly: true,
    addButton: true,
    selectAllButton: true, // 全选
    reverseSelectAllButton: true, // 反选
    clearSelectedButton: true, // 清空
    saveButton: true,
    deleteButton: true, // 单独的删除按钮 删除按钮需要配合checkBox列
    paginationVisible: true,
    pagination: {
      currentPage: 0,
      pageSize: 10,
      total: 0, // 总行数
      showPrev: false,
      showPager: false,
      showNext: false,
      showJumper: true,
      showTotal: true
    }
  },
  hooks: {
    beforeSubmit: (model, extraModel) => {},
    afterSubmit: (model, extraModel) => {}
  },
  events: {
    submit: (model, extraModel) => {},
    validate: (model, extraModel, validateResult) => {}, // 函数返回promise
    pageChange: (currentPage, pageSize, orderField, orderBy) => {},
    addClick: (model, extraModel) => {},
    deleteClick: (model, extraModel) => {},
    selectChange: (model, extraModel, selected) => {}
  }
}
