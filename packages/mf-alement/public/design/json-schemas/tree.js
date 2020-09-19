export default {
  tag: 'al-tree', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value
  hide: false,
  attrs: {
    emptyText: '', // 内容为空的时候展示的文本
    options: [
      { value: '', text: '', disabled: false, children: [] }
    ],
    accordion: false, // 是否每次只打开一个同级树节点展开
    defaultExpandedKeys: ['nodeKey1', 'nodeKey2'], // 默认展开的节点的 key 的数组
    // currentNodeKey: ['nodeKey1', 'nodeKey2'], // 当前选中的节点 就是value值
    showCheckbox: false, // 节点是否可被选择
    draggable: false, // 是否开启拖拽节点功能
    allowDrag: (node) => {}, // 判断节点能否被拖拽
    allowDrop: (draggingNode, dropNode, type) => {} // 拖拽时判定目标节点能否被放置 type: 'prev'、'inner' 和 'next' 分别表示放置在目标节点前、插入至目标节点和放置在目标节点后
  },
  events: {
    nodeClick: (tree, node) => {},
    nodeContextmenu: (tree, node) => {},
    checkChange: (tree, node, checkedNodes) => {},
    check: (tree, node, action) => {},
    nodeExpand: (tree, node) => {},
    nodeCollapse: (tree, node) => {},
    nodeDragStart: (tree, node) => {},
    nodeDragEnter: (tree, node, enterNode) => {},
    nodeDragLeave: (tree, node, leaveNode) => {},
    nodeDragEnd: (tree, node, enterNode, position) => {}, // enterNode可能为空 因为拖拽可能不成功, position(被拖拽节点的放置位置): before、after、inner
    nodeDrop: (tree, node, enterNode, position) => {}
  }
}
