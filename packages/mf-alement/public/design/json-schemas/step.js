export default {
  tag: 'al-step', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value
  hide: false,
  attrs: {
    space: 'number / string', // 每个 step 的间距，不填写将自适应间距。支持百分比。
    direction: 'vertical/horizontal', // 显示方向
    processStatus: '', // 设置当前步骤的状态 wait / process / finish / error / success
    finishStatus: '', // 设置结束步骤的状态 wait / process / finish / error / success
    alignCenter: false, // 进行居中对齐
    simple: false, // 是否应用简洁风格
    options: [
      { value: '', text: 'label', description: '', status: '' } // wait / process / finish / error / success
    ]
  }
}
