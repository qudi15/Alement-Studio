export default {
  tag: 'al-nav-menu', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value
  hide: false,
  attrs: {
    mode: 'horizontal / vertical',
    collapse: false, // 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
    backgroundColor: '', // 16进制颜色
    textColor: '', // 16进制颜色
    activeTextColor: '', // 16进制颜色
    defaultActive: '',
    defaultOpeneds: [],
    uniqueOpened: false, // 是否只保持一个子菜单的展开
    menuTrigger: 'hover / click',
    router: false, // 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
    collapseTransition: true, // 是否开启折叠动画
    options: [
      { value: '', text: '', disabled: true, group: '', children: [] }
    ]
  },
  events: {
    select: (index, indexPath) => {},
    open: (index, indexPath) => {},
    close: (index, indexPath) => {}
  }
}
