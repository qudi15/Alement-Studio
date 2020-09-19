// 手动上传
export default {
  tag: 'al-upload', // 标签名 *
  id: '', // 原生id *
  name: '', // 原生name *
  classList: [], // 节点的class集合 string[]
  styleMap: {}, // 节点的styleMap key: value
  hide: false,
  attrs: {
    // 节点的特殊属性 key: value
    showFileList: false,
    action: '',
    formData: {},
    fileName: '',
    header: {},
    type: 'text', // text picture picture-card
    multiple: false,
    disabled: false,
    limit: 5, // 最大文件数 0不限制
    accept: '',
    tips: '',
    displayBtn: true
  },
  events: {
    // 节点的事件 key: function() {}
    change: (value, model, extraModel) => {},
    delete: (value, model, extraModel) => {},
    upload: (value, model, extraModel) => {}
  },
  hooks: {
    beforeUpload: (value, model, extraModel) => {},
    afterUpload: (value, model, extraModel) => {}
  }
}
