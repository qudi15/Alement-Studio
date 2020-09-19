// page 接收 jsonSchema model extraModel
export default {
  tag: 'al-page',
  id: '',
  name: '',
  classList: [],
  styleMap: {},
  children: [],
  hide: false,
  attrs: {
    loading: false,
    visible: true
  },
  hooks: {
    beforeSubmit: (model, extraModel) => {},
    afterSubmit: (model, extraModel) => {},
    afterReady: (model, extraModel) => {}
  },
  events: {
    ready: (model, extraModel) => {},
    validator: (model, extraModel, validateResult) => {},
    submit: (model, extraModel) => {},
    enable: (model, extraModel) => {},
    disable: (model, extraModel) => {}
  }
}
