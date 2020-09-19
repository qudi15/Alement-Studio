export default {
  tag: 'al-pagination', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value
  hide: false,
  attrs: {
    hideOnSinglePage: false, // 只有一页时是否隐藏
    disabled: false,
    currentPage: 0,
    pageSize: 10,
    total: 0, // 总行数
    showPrev: false,
    showPager: false,
    showNext: false,
    showJumper: true,
    showTotal: true
  },
  events: {
    pageChange: (currentPage, pageSize) => {}
  }
}
