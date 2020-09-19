
import { alGetterCoolPath, alSetterCoolPath } from '../utils'

import Base from './base'

const NO_DYNAMIC_FIELDS_LIST = [
  'format',
  'parse',
  'type',
  'disabledDate'
]

export default {
  extends: Base,
  props: {
    /**
     * 容器组件需要绑定数据模型给原子组件或者里面嵌套的容器组件
     */
    model: {
      type: [Object, Array]
    },
    /**
     * 额外的数据
     */
    extra: {
      type: Object
    }
  },

  methods: {
    /**
     * 获取字段attrs中的属性，为fasy则设置默认值
     * @private
     */
    getAttr (field = {}, key = '', def, model) {
      const val = (field.attrs || {})[key]
      model = model || this.model
      if (typeof val === 'function' && !NO_DYNAMIC_FIELDS_LIST.includes(key)) {
        return val(model, this.extra, def)
      }
      return val == null ? def : val
    },

    /**
     * 判断元素是否显示
     * @param {Schema} child
     */
    isShow (child = {}) {
      const hide = child.hide
      if (typeof hide === 'boolean') { return !hide }
      if (typeof hide === 'function') { return !hide(this.model, this.extra) }
      return true
    },

    /**
     *
     * 根据事件名获取schema中的事件
     * @param {Schema} field
     * @param {String} name
     */
    getEvent (field = {}, name) {
      return (field.events || {})[name] || (_ => _)
    },

    /**
     * 生成绑定的events
     * @private
     */
    getEvents (item) {
      const eventList = {}

      if (item.events) {
        Object.keys(item.events).forEach(eventName => {
          eventList[eventName] = this.getEvent(item, eventName)
        })
      }

      return eventList
    },

    getValue (child) {
      const key = this.getAttr(child, 'primaryKey')
      const format = this.getAttr(child, 'format')

      // 处理查询条件中primaryKey中带有.但不需要嵌套赋值的问题
      const noNestedKey = this.getAttr(child, 'noNestedKey')
      const val = noNestedKey ? this.model[key] : (key ? alGetterCoolPath(this.model, key) : this.model)

      if (typeof format === 'function') { return format(val, this.model, this.extra) }
      return val
    },

    alFormControlChange (model, keyPath, value) {
      if (keyPath) {
        alSetterCoolPath(model, keyPath, value)
      }
    }
  }
}
